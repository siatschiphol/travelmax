-- Create enum for listing types
CREATE TYPE listing_type AS ENUM ('tour', 'event');

-- Create enum for listing status
CREATE TYPE listing_status AS ENUM ('draft', 'published', 'archived');

-- Create the experiences table
CREATE TABLE experiences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    type listing_type NOT NULL,
    status listing_status DEFAULT 'draft',
    
    -- Common fields
    price DECIMAL(10,2) NOT NULL,
    short_description TEXT,
    full_description TEXT,
    thumbnail_url TEXT,
    gallery_urls JSONB DEFAULT '[]'::jsonb,
    youtube_url TEXT,
    
    -- Tour specific fields stored in JSONB
    tour_details JSONB DEFAULT NULL,
    /* Example tour_details structure:
    {
        "categories": ["Adventure", "Cultural"],
        "important_information": "text",
        "included_items": ["item1", "item2"],
        "excluded_items": ["item1", "item2"],
        "schedule": "text",
        "schedule_dates": ["2024-01-01", "2024-01-02"],
        "max_tours_at_time": 1,
        "max_guests": 10
    }
    */
    
    -- Event specific fields stored in JSONB
    event_details JSONB DEFAULT NULL,
    /* Example event_details structure:
    {
        "venue": "text",
        "event_date": "2024-01-01",
        "event_time": "19:00",
        "seating_details": "text",
        "ticket_types": [
            {
                "name": "VIP",
                "price": 100.00,
                "quantity": 50
            }
        ]
    }
    */
    
    -- Metadata and timestamps
    views_count INTEGER DEFAULT 0,
    bookings_count INTEGER DEFAULT 0,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create index for faster JSON queries
CREATE INDEX idx_tour_details ON experiences USING GIN (tour_details);
CREATE INDEX idx_event_details ON experiences USING GIN (event_details);

-- Create index for listing type and status
CREATE INDEX idx_listing_type_status ON experiences (type, status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_experiences_updated_at
    BEFORE UPDATE ON experiences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create a function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN LOWER(
        REGEXP_REPLACE(
            REGEXP_REPLACE(
                title,
                '[^a-zA-Z0-9\s-]',
                ''
            ),
            '\s+',
            '-'
        )
    );
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically generate slug from title if not provided
CREATE OR REPLACE FUNCTION set_slug_if_empty()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug := generate_slug(NEW.title);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_experience_slug
    BEFORE INSERT OR UPDATE ON experiences
    FOR EACH ROW
    EXECUTE FUNCTION set_slug_if_empty();

-- Enable RLS
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "View published experiences" ON experiences;
DROP POLICY IF EXISTS "View own experiences" ON experiences;
DROP POLICY IF EXISTS "Insert own experiences" ON experiences;
DROP POLICY IF EXISTS "Update own experiences" ON experiences;
DROP POLICY IF EXISTS "Delete own experiences" ON experiences;
DROP POLICY IF EXISTS "Enable read access for all users" ON experiences;
DROP POLICY IF EXISTS "Enable insert access for authenticated users only" ON experiences;
DROP POLICY IF EXISTS "Enable update access for owners only" ON experiences;
DROP POLICY IF EXISTS "Enable delete access for owners only" ON experiences;
DROP POLICY IF EXISTS "Enable read for all users" ON experiences;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON experiences;
DROP POLICY IF EXISTS "Enable update for owners and admins" ON experiences;
DROP POLICY IF EXISTS "Enable delete for owners and admins" ON experiences;

-- Create simple policies without user_profiles dependency
CREATE POLICY "Public read access" ON experiences
    FOR SELECT USING (
        status = 'published' OR -- Anyone can read published experiences
        auth.uid() = created_by -- Owners can read their own experiences
    );

CREATE POLICY "Authenticated insert access" ON experiences
    FOR INSERT WITH CHECK (
        auth.uid() = created_by AND -- Only allow setting created_by to the current user
        auth.role() = 'authenticated'
    );

CREATE POLICY "Owner update access" ON experiences
    FOR UPDATE USING (
        auth.uid() = created_by -- Only owners can update their experiences
    );

CREATE POLICY "Owner delete access" ON experiences
    FOR DELETE USING (
        auth.uid() = created_by -- Only owners can delete their experiences
    );

-- Example of how to insert a tour listing
COMMENT ON TABLE experiences IS 'Example insert for a tour:
INSERT INTO experiences (
    title,
    type,
    status,
    price,
    short_description,
    full_description,
    tour_details
) VALUES (
    ''Amazing City Tour'',
    ''tour'',
    ''published'',
    99.99,
    ''Explore the city highlights'',
    ''Detailed description of the tour...'',
    ''{"categories": ["City Tours", "Cultural"],
       "important_information": "Please arrive 15 minutes early",
       "included_items": ["⊕ Professional guide", "⊕ Hotel pickup"],
       "excluded_items": ["⊖ Gratuities", "⊖ Personal expenses"],
       "schedule": "Daily tours at 9 AM",
       "schedule_dates": ["2024-01-01", "2024-01-02"],
       "max_tours_at_time": 2,
       "max_guests": 15
    }''::jsonb
);';
