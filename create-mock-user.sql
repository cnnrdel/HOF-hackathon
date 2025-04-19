-- First, check if the user already exists to avoid duplicates
DO $$
DECLARE
    user_exists BOOLEAN;
    user_id UUID;
BEGIN
    -- Check if user exists in auth.users
    SELECT EXISTS (
        SELECT 1 FROM auth.users WHERE email = 'hofhackathon@nyu.edu'
    ) INTO user_exists;

    IF NOT user_exists THEN
        -- Create the user in auth.users with a properly hashed password
        -- Note: In a real environment, you'd use auth.sign_up, but for this demo we're inserting directly
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            recovery_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) 
        VALUES (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            'hofhackathon@nyu.edu',
            crypt('HelloWorld', gen_salt('bf')),
            NOW(),
            NOW(),
            NOW(),
            '{"provider": "email", "providers": ["email"]}',
            '{"name": "HOF Hackathon"}',
            NOW(),
            NOW(),
            '',
            '',
            '',
            ''
        )
        RETURNING id INTO user_id;

        -- Create profile for the user
        INSERT INTO profiles (id, name, email, created_at, updated_at, onboarding_completed)
        VALUES (user_id, 'HOF Hackathon', 'hofhackathon@nyu.edu', NOW(), NOW(), false);

        -- Create preferences for the user
        INSERT INTO preferences (user_id, language, location)
        VALUES (user_id, 'en', 'nyc');

        RAISE NOTICE 'Created mock user with ID: %', user_id;
    ELSE
        RAISE NOTICE 'Mock user already exists';
        
        -- Get the user ID
        SELECT id INTO user_id FROM auth.users WHERE email = 'hofhackathon@nyu.edu';
        
        -- Reset onboarding_completed to false to ensure questionnaire is shown
        UPDATE profiles SET onboarding_completed = false WHERE id = user_id;
        
        RAISE NOTICE 'Reset onboarding status for user ID: %', user_id;
    END IF;
END
$$;
