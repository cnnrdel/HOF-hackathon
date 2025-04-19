-- Create a function to mark a user as deleted without sending emails
CREATE OR REPLACE FUNCTION mark_user_as_deleted(user_id UUID)
RETURNS VOID AS $$
BEGIN
    -- Update the auth.users table to mark the user as deleted
    -- This is a direct database operation that bypasses the email verification
    UPDATE auth.users
    SET 
        raw_app_meta_data = raw_app_meta_data || 
            jsonb_build_object(
                'deleted', true,
                'deleted_at', to_char(now(), 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
            )
    WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to the authenticated role
GRANT EXECUTE ON FUNCTION mark_user_as_deleted TO authenticated;
