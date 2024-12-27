'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LocationData {
  country: string;
  city: string;
  coordinates: [number, number];
  region: string;
}

interface Availability {
  seasonal_dates: { start: string; end: string }[];
  blackout_dates: string[];
  capacity: number;
}

interface Media {
  images: string[];
  videos: string[];
  virtual_tours: string[];
}

interface ExperienceDetails {
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  provider_id: string;
  base_price: number;
  currency: string;
  description: string;
  included_items: string[];
  excluded_items: string[];
  itinerary: { day: number; description: string }[];
  meeting_point: string;
  requirements: string[];
  location_data: LocationData;
  availability: Availability;
  media: Media;
}

export default function NewExperiencePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [experienceDetails, setExperienceDetails] = useState<ExperienceDetails>({
    title: '',
    slug: '',
    status: 'draft',
    provider_id: '',
    base_price: 0,
    currency: 'USD',
    description: '',
    included_items: [],
    excluded_items: [],
    itinerary: [],
    meeting_point: '',
    requirements: [],
    location_data: {
      country: '',
      city: '',
      coordinates: [0, 0],
      region: ''
    },
    availability: {
      seasonal_dates: [],
      blackout_dates: [],
      capacity: 0
    },
    media: {
      images: [],
      videos: [],
      virtual_tours: []
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/experiences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          details: experienceDetails,
          timestamps: {
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        }),
      });

      if (!response.ok) throw new Error('Failed to create experience');
      router.push('/experiences');
    } catch (error) {
      console.error('Error creating experience:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Experience</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={experienceDetails.title}
              onChange={(e) => setExperienceDetails({
                ...experienceDetails,
                title: e.target.value,
                slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
              })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={experienceDetails.status}
              onChange={(e) => setExperienceDetails({
                ...experienceDetails,
                status: e.target.value as 'draft' | 'published' | 'archived'
              })}
              className="w-full p-2 border rounded"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Base Price</label>
              <input
                type="number"
                value={experienceDetails.base_price}
                onChange={(e) => setExperienceDetails({
                  ...experienceDetails,
                  base_price: parseFloat(e.target.value)
                })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Currency</label>
              <select
                value={experienceDetails.currency}
                onChange={(e) => setExperienceDetails({
                  ...experienceDetails,
                  currency: e.target.value
                })}
                className="w-full p-2 border rounded"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={experienceDetails.description}
              onChange={(e) => setExperienceDetails({
                ...experienceDetails,
                description: e.target.value
              })}
              className="w-full p-2 border rounded h-32"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                value={experienceDetails.location_data.country}
                onChange={(e) => setExperienceDetails({
                  ...experienceDetails,
                  location_data: {
                    ...experienceDetails.location_data,
                    country: e.target.value
                  }
                })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                value={experienceDetails.location_data.city}
                onChange={(e) => setExperienceDetails({
                  ...experienceDetails,
                  location_data: {
                    ...experienceDetails.location_data,
                    city: e.target.value
                  }
                })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Meeting Point</label>
            <input
              type="text"
              value={experienceDetails.meeting_point}
              onChange={(e) => setExperienceDetails({
                ...experienceDetails,
                meeting_point: e.target.value
              })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Capacity</label>
            <input
              type="number"
              value={experienceDetails.availability.capacity}
              onChange={(e) => setExperienceDetails({
                ...experienceDetails,
                availability: {
                  ...experienceDetails.availability,
                  capacity: parseInt(e.target.value)
                }
              })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Creating...' : 'Create Experience'}
          </button>
        </div>
      </form>
    </div>
  );
}
