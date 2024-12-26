export interface ExperienceFormData {
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
