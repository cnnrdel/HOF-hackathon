-- Create a function to execute arbitrary SQL with elevated privileges
CREATE OR REPLACE FUNCTION execute_sql(sql_query TEXT) 
RETURNS VOID AS $$
BEGIN
  EXECUTE sql_query;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
