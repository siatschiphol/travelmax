'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Experience {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  price: number;
  duration: string;
  included: string[];
  maxGroupSize: number;
  createdAt: string;
}

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experiences');
      if (!response.ok) throw new Error('Failed to fetch experiences');
      const data = await response.json();
      setExperiences(data);
    } catch (err) {
      setError('Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Experiences Management</h1>
        <button
          onClick={() => router.push('/experiences/new')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Experience
        </button>
      </div>

      <div className="grid gap-4">
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{experience.title}</h2>
                <p className="text-gray-600">{experience.location}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Duration: {experience.duration} | Max Group: {experience.maxGroupSize} people
                </p>
                <p className="font-medium mt-2">${experience.price}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/experiences/${experience.id}/edit`)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => router.push(`/experiences/${experience.id}`)}
                  className="text-green-500 hover:text-green-700"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
