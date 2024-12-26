export interface ExperienceFormData {
  // Basic Info
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  provider_id: string;
  categories: string[];
  
  // Descriptions
  shortDescription: string;
  fullDescription: string;
  importantInformation: string;
  
  // Pricing
  base_price: number;
  currency: string;
  
  // Items
  included: string;
  excluded: string;
  
  // Location
  location_data: {
    country: string;
    city: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    region: string;
  };
  
  // Meeting Point
  meeting_point: {
    address: string;
    instructions: string;
  };
  
  // Requirements
  requirements: string[];
  
  // Availability
  availability: {
    seasonal_dates: Array<{
      start_date: string;
      end_date: string;
    }>;
    blackout_dates: string[];
    capacity: {
      max_tours: number;
      max_guests: number;
    };
  };
  
  // Schedule (keeping existing scheduling system)
  schedule: string;
  scheduleDates: Date[];
  
  // Media
  media: {
    images: File[];
    videos: string[];
    virtual_tours: string[];
    youtube_link?: string;
  };
  
  // Timestamps will be handled server-side
  timestamps?: {
    created_at: string;
    updated_at: string;
  };
}

export interface ExperienceFormProps {
  initialData?: any;
  experienceId?: string;
  mode: 'create' | 'edit';
}

export const EXPERIENCE_CATEGORIES = [
  'Adventure',
  'Cultural',
  'Historical',
  'Nature',
  'Beach',
  'City Tours',
  'Food & Wine',
  'Wildlife',
  'Photography',
  'Religious'
] as const;
