-- Update RLS policies for profiles table to allow inserts
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Anyone can insert profiles" ON profiles;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Anyone can insert profiles"
  ON profiles FOR INSERT
  WITH CHECK (true);

-- Update RLS policies for preferences table to allow inserts
ALTER TABLE preferences ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own preferences" ON preferences;
DROP POLICY IF EXISTS "Users can update their own preferences" ON preferences;
DROP POLICY IF EXISTS "Anyone can insert preferences" ON preferences;

-- Create policies
CREATE POLICY "Users can view their own preferences"
  ON preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON preferences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert preferences"
  ON preferences FOR INSERT
  WITH CHECK (true);
