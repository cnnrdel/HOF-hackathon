-- First, let's create a policy to allow anyone to insert into profiles
DROP POLICY IF EXISTS "Anyone can insert profiles" ON profiles;

CREATE POLICY "Anyone can insert profiles"
ON profiles FOR INSERT
WITH CHECK (true);

-- Create a policy to allow anyone to insert into preferences
DROP POLICY IF EXISTS "Anyone can insert preferences" ON preferences;

CREATE POLICY "Anyone can insert preferences"
ON preferences FOR INSERT
WITH CHECK (true);

-- Make sure the execute_sql function exists
CREATE OR REPLACE FUNCTION execute_sql(sql_query TEXT) 
RETURNS VOID AS $$
BEGIN
  EXECUTE sql_query;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to create a profile for a new user
CREATE OR REPLACE FUNCTION create_profile_for_user(
  user_id UUID,
  user_name TEXT,
  user_email TEXT
) RETURNS VOID AS $$
BEGIN
  INSERT INTO profiles (id, name, email)
  VALUES (user_id, user_name, user_email)
  ON CONFLICT (id) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to create preferences for a new user
CREATE OR REPLACE FUNCTION create_preferences_for_user(
  user_id UUID,
  user_language TEXT DEFAULT 'en'
) RETURNS VOID AS $$
BEGIN
  INSERT INTO preferences (user_id, topics, experience_level, language)
  VALUES (user_id, ARRAY[]::text[], 'beginner', user_language)
  ON CONFLICT (user_id) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
