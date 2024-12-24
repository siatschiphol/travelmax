-- Create enum for listing types
CREATE TYPE listing_type AS ENUM ('tour', 'event');

-- Create enum for listing status
CREATE TYPE listing_status AS ENUM ('draft', 'published', 'archived');

-- Create the listings table
CREATE TABLE listings (
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
CREATE INDEX idx_tour_details ON listings USING GIN (tour_details);
CREATE INDEX idx_event_details ON listings USING GIN (event_details);

-- Create index for listing type and status
CREATE INDEX idx_listing_type_status ON listings (type, status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_listings_updated_at
    BEFORE UPDATE ON listings
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

CREATE TRIGGER set_listing_slug
    BEFORE INSERT OR UPDATE ON listings
    FOR EACH ROW
    EXECUTE FUNCTION set_slug_if_empty();

-- Add RLS (Row Level Security) policies
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Policy for viewing published listings (public)
CREATE POLICY "View published listings" ON listings
    FOR SELECT
    USING (status = 'published');

-- Policy for listing owners to view all their listings
CREATE POLICY "View own listings" ON listings
    FOR SELECT
    USING (created_by = auth.uid());

-- Policy for listing owners to insert their listings
CREATE POLICY "Insert own listings" ON listings
    FOR INSERT
    WITH CHECK (created_by = auth.uid());

-- Policy for listing owners to update their listings
CREATE POLICY "Update own listings" ON listings
    FOR UPDATE
    USING (created_by = auth.uid())
    WITH CHECK (created_by = auth.uid());

-- Policy for listing owners to delete their listings
CREATE POLICY "Delete own listings" ON listings
    FOR DELETE
    USING (created_by = auth.uid());

-- Example of how to insert a tour listing
COMMENT ON TABLE listings IS 'Example insert for a tour:
INSERT INTO listings (
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
