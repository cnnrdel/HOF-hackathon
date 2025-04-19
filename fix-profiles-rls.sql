-- Add RLS policy to allow insertion of new profiles
DO $
BEGIN
  -- Drop the policy if it exists
  DROP POLICY IF EXISTS "Anyone can insert profiles" ON profiles;
  
  -- Create policy to allow insertion of new profiles
  CREATE POLICY "Anyone can insert profiles"
    ON profiles FOR INSERT
    WITH CHECK (true);  -- This allows any insertion
END
$;
