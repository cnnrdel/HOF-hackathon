-- Check if profiles table exists
DO $$
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles'
  ) THEN
    -- Drop the existing foreign key constraint if it exists
    ALTER TABLE IF EXISTS profiles 
    DROP CONSTRAINT IF EXISTS profiles_id_fkey;
    
    -- Add the correct foreign key constraint with ON DELETE CASCADE
    ALTER TABLE profiles
    ADD CONSTRAINT profiles_id_fkey 
    FOREIGN KEY (id) 
    REFERENCES auth.users(id) 
    ON DELETE CASCADE;
    
    -- Make sure RLS is enabled
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
  ELSE
    -- Create the profiles table with the correct constraint
    CREATE TABLE profiles (
      id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      name TEXT,
      email TEXT UNIQUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Enable RLS
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
  END IF;
END
$$;

-- Create or replace policies
DO $$
BEGIN
  -- Drop policies if they exist
  DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
  
  -- Create policies
  CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);
  
  CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);
END
$$;
