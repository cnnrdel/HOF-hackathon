-- Create a stored procedure to create a profile for a user
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

-- Create a stored procedure to create preferences for a user
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
