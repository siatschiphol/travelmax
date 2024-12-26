export interface TourFormData {
  title: string;
  categories: string[];
  shortDescription: string;
  fullDescription: string;
  importantInformation: string;
  included: string;
  excluded: string;
  price: number;
  schedule: string;
  scheduleDates: Date[];
  maxToursAtTime: number;
  maxGuests: number;
  youtubeLink: string;
  images: File[];
}

export interface TourFormProps {
  initialData?: any;
  tourId?: string;
  mode: 'create' | 'edit';
}

export const TOUR_CATEGORIES = [
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
