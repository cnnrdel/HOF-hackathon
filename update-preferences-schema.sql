-- Add new columns to the preferences table
ALTER TABLE preferences ADD COLUMN IF NOT EXISTS food_security TEXT DEFAULT 'never';
ALTER TABLE preferences ADD COLUMN IF NOT EXISTS zip_code TEXT DEFAULT '';
ALTER TABLE preferences ADD COLUMN IF NOT EXISTS immigration_status TEXT DEFAULT '';
ALTER TABLE preferences ADD COLUMN IF NOT EXISTS location TEXT DEFAULT 'nyc';

-- Comment on the new columns
COMMENT ON COLUMN preferences.food_security IS 'How often the user experiences food insecurity: never, sometimes, often, always';
COMMENT ON COLUMN preferences.zip_code IS 'User ZIP code for location-based recommendations';
COMMENT ON COLUMN preferences.immigration_status IS 'User immigration status for targeted resources';
COMMENT ON COLUMN preferences.location IS 'User preferred location for resources';

-- Create an index on the location column for faster queries
CREATE INDEX IF NOT EXISTS preferences_location_idx ON preferences(location);
