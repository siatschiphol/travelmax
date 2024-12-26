'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, X, Image as ImageIcon, Check, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/client'
import { updateTour, createTour } from '../actions'
import { TourFormData, TourFormProps, TOUR_CATEGORIES } from '../types'
import { uploadTourImages, generateSlug } from '../utils'

export default function TourForm({ initialData, tourId, mode }: TourFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const [tourForm, setTourForm] = useState<TourFormData>(() => {
    console.log('Initializing form with data:', initialData)
    return {
      // Basic Info
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      status: initialData?.status || 'draft',
      provider_id: initialData?.provider_id || '',
      categories: Array.isArray(initialData?.details?.categories) ? initialData.details.categories : [],
      
      // Descriptions
      shortDescription: initialData?.details?.description?.short || '',
      fullDescription: initialData?.details?.description?.full || '',
      importantInformation: initialData?.details?.description?.important_information || '',
      
      // Pricing
      base_price: initialData?.details?.pricing?.base_price || 0,
      currency: initialData?.details?.pricing?.currency || 'USD',
      
      // Items
      included: Array.isArray(initialData?.details?.included_items) ? initialData.details.included_items.join('\n') : '',
      excluded: Array.isArray(initialData?.details?.excluded_items) ? initialData.details.excluded_items.join('\n') : '',
      
      // Location
      location_data: {
        country: initialData?.details?.location_data?.country || '',
        city: initialData?.details?.location_data?.city || '',
        coordinates: {
          latitude: initialData?.details?.location_data?.coordinates?.latitude || 0,
          longitude: initialData?.details?.location_data?.coordinates?.longitude || 0
        },
        region: initialData?.details?.location_data?.region || ''
      },
      
      // Meeting Point
      meeting_point: {
        address: initialData?.details?.meeting_point?.address || '',
        instructions: initialData?.details?.meeting_point?.instructions || ''
      },
      
      // Requirements
      requirements: Array.isArray(initialData?.details?.requirements) ? initialData.details.requirements : [],
      
      // Availability
      availability: {
        seasonal_dates: Array.isArray(initialData?.details?.availability?.seasonal_dates) 
          ? initialData.details.availability.seasonal_dates 
          : [],
        blackout_dates: Array.isArray(initialData?.details?.availability?.blackout_dates) 
          ? initialData.details.availability.blackout_dates 
          : [],
        capacity: {
          max_tours: initialData?.details?.capacity?.max_tours || 1,
          max_guests: initialData?.details?.capacity?.max_guests || 1
        }
      },
      
      // Schedule (keeping existing scheduling system)
      schedule: '',
      scheduleDates: Array.isArray(initialData?.details?.schedule?.availability?.specific_dates) 
        ? initialData.details.schedule.availability.specific_dates.map((d: string) => new Date(d)) 
        : [],
      
      // Media
      media: {
        images: [],
        videos: Array.isArray(initialData?.details?.media?.videos) ? initialData.details.media.videos : [],
        virtual_tours: Array.isArray(initialData?.details?.media?.virtual_tours) ? initialData.details.media.virtual_tours : [],
        youtube_link: initialData?.details?.media?.youtube_url || ''
      }
    }
  })

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('You must be logged in to create a tour')
      }

      // Upload images to Supabase Storage
      const imageUrls = await uploadTourImages(tourForm.media.images)

      // Prepare the experience data
      const experienceData = {
        details: {
          title: tourForm.title,
          slug: generateSlug(tourForm.title),
          type: 'tour',
          status: tourForm.status,
          pricing: {
            base_price: parseFloat(tourForm.base_price.toString()),
            currency: tourForm.currency
          },
          description: {
            short: tourForm.shortDescription,
            full: tourForm.fullDescription,
            important_information: tourForm.importantInformation
          },
          media: {
            gallery_urls: mode === 'edit' 
              ? [...(initialData?.details?.media?.gallery_urls || []), ...imageUrls]
              : imageUrls,
            youtube_url: tourForm.media.youtube_link
          },
          included_items: tourForm.included.split('\n').filter(item => item.trim()),
          excluded_items: tourForm.excluded.split('\n').filter(item => item.trim()),
          categories: tourForm.categories,
          location_data: tourForm.location_data,
          meeting_point: tourForm.meeting_point,
          requirements: tourForm.requirements,
          availability: tourForm.availability,
          schedule: {
            availability: {
              specific_dates: tourForm.scheduleDates.map(date => date.toISOString().split('T')[0])
            }
          }
        }
      }

      if (mode === 'edit' && tourId) {
        const result = await updateTour(tourId, experienceData)
        if (!result.success) {
          throw new Error(result.error || 'Failed to update tour')
        }
      } else {
        const result = await createTour(experienceData)
        if (!result.success) {
          throw new Error(result.error || 'Failed to create tour')
        }
      }

      router.push('/admin/experiences')
      router.refresh()

    } catch (err) {
      console.error('Error saving tour:', err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An error occurred while saving the tour')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setTourForm(prev => ({
      ...prev,
      media: { ...prev.media, images: [...prev.media.images, ...files] }
    }))
  }

  const removeImage = (index: number) => {
    setTourForm(prev => ({
      ...prev,
      media: { ...prev.media, images: prev.media.images.filter((_, i) => i !== index) }
    }))
  }

  const handleIncludedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    const lines = value.split('\n');
    
    const processedLines = lines.map(line => {
      if (line.trim() && !line.startsWith('⊕ ')) {
        return `⊕ ${line.replace(/^[⊕|⊖]\s?/, '')}`;
      }
      return line;
    });
    
    value = processedLines.join('\n');
    setTourForm({...tourForm, included: value});
  };

  const handleExcludedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    const lines = value.split('\n');
    
    const processedLines = lines.map(line => {
      if (line.trim() && !line.startsWith('⊖ ')) {
        return `⊖ ${line.replace(/^[⊕|⊖]\s?/, '')}`;
      }
      return line;
    });
    
    value = processedLines.join('\n');
    setTourForm({...tourForm, excluded: value});
  };

  const toggleCategory = (category: string) => {
    setTourForm(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Tour Title
          </label>
          <input
            type="text"
            id="title"
            value={tourForm.title}
            onChange={(e) => setTourForm({ ...tourForm, title: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Categories */}
        <div className="relative">
          <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-1">
            Categories
          </label>
          <div
            ref={dropdownRef}
            className="relative"
          >
            <div
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-3 px-4 shadow-sm hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {tourForm.categories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tourForm.categories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCategory(category);
                        }}
                        className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-blue-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">Select categories</span>
              )}
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${showCategoryDropdown ? 'rotate-180' : ''}`} />
              </span>
            </div>

            {showCategoryDropdown && (
              <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="max-h-60 overflow-auto py-1">
                  {TOUR_CATEGORIES.map((category) => (
                    <div
                      key={category}
                      className={`relative cursor-pointer select-none px-4 py-3 hover:bg-gray-50 ${
                        tourForm.categories.includes(category) ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => toggleCategory(category)}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`block truncate ${
                          tourForm.categories.includes(category) ? 'font-medium text-blue-700' : 'text-gray-700'
                        }`}>
                          {category}
                        </span>
                        {tourForm.categories.includes(category) && (
                          <Check className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
            Short Description
          </label>
          <textarea
            id="shortDescription"
            rows={3}
            value={tourForm.shortDescription}
            onChange={(e) => setTourForm({ ...tourForm, shortDescription: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Full Description */}
        <div>
          <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700">
            Full Description
          </label>
          <textarea
            id="fullDescription"
            rows={6}
            value={tourForm.fullDescription}
            onChange={(e) => setTourForm({ ...tourForm, fullDescription: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Important Information */}
        <div>
          <label htmlFor="importantInformation" className="block text-sm font-medium text-gray-700">
            Important Information
          </label>
          <textarea
            id="importantInformation"
            rows={4}
            value={tourForm.importantInformation}
            onChange={(e) => setTourForm({ ...tourForm, importantInformation: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Included Items */}
        <div>
          <label htmlFor="included" className="block text-sm font-medium text-gray-700">
            What's Included
          </label>
          <textarea
            id="included"
            rows={4}
            value={tourForm.included}
            onChange={handleIncludedChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const cursorPosition = e.currentTarget.selectionStart;
                const value = e.currentTarget.value;
                const newValue = 
                  value.slice(0, cursorPosition) + 
                  '\n⊕ ' + 
                  value.slice(cursorPosition);
                setTourForm({...tourForm, included: newValue});
              }
            }}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm font-mono"
            placeholder="⊕ Hotel pickup and drop-off&#10;⊕ Professional guide&#10;⊕ Lunch"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Press Enter to add a new item
          </p>
        </div>

        {/* Excluded Items */}
        <div>
          <label htmlFor="excluded" className="block text-sm font-medium text-gray-700">
            What's Not Included
          </label>
          <textarea
            id="excluded"
            rows={4}
            value={tourForm.excluded}
            onChange={handleExcludedChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const cursorPosition = e.currentTarget.selectionStart;
                const value = e.currentTarget.value;
                const newValue = 
                  value.slice(0, cursorPosition) + 
                  '\n⊖ ' + 
                  value.slice(cursorPosition);
                setTourForm({...tourForm, excluded: newValue});
              }
            }}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm font-mono"
            placeholder="⊖ Gratuities&#10;⊖ Personal expenses&#10;⊖ Travel insurance"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Press Enter to add a new item
          </p>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="base_price" className="block text-sm font-medium text-gray-700">
            Price (USD)
          </label>
          <input
            type="number"
            id="base_price"
            value={tourForm.base_price}
            onChange={(e) => setTourForm({ ...tourForm, base_price: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            min="0"
            step="0.01"
            required
          />
        </div>

        {/* Location Data */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Location Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                id="country"
                value={tourForm.location_data.country}
                onChange={(e) => setTourForm({ 
                  ...tourForm, 
                  location_data: { 
                    ...tourForm.location_data, 
                    country: e.target.value 
                  } 
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                value={tourForm.location_data.city}
                onChange={(e) => setTourForm({ 
                  ...tourForm, 
                  location_data: { 
                    ...tourForm.location_data, 
                    city: e.target.value 
                  } 
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                Region
              </label>
              <input
                type="text"
                id="region"
                value={tourForm.location_data.region}
                onChange={(e) => setTourForm({ 
                  ...tourForm, 
                  location_data: { 
                    ...tourForm.location_data, 
                    region: e.target.value 
                  } 
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                Latitude
              </label>
              <input
                type="number"
                id="latitude"
                value={tourForm.location_data.coordinates.latitude}
                onChange={(e) => setTourForm({ 
                  ...tourForm, 
                  location_data: { 
                    ...tourForm.location_data, 
                    coordinates: {
                      ...tourForm.location_data.coordinates,
                      latitude: parseFloat(e.target.value)
                    }
                  } 
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                step="0.000001"
                required
              />
            </div>
            <div>
              <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                Longitude
              </label>
              <input
                type="number"
                id="longitude"
                value={tourForm.location_data.coordinates.longitude}
                onChange={(e) => setTourForm({ 
                  ...tourForm, 
                  location_data: { 
                    ...tourForm.location_data, 
                    coordinates: {
                      ...tourForm.location_data.coordinates,
                      longitude: parseFloat(e.target.value)
                    }
                  } 
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                step="0.000001"
                required
              />
            </div>
          </div>
        </div>

        {/* Meeting Point */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Meeting Point</h3>
          <div>
            <label htmlFor="meeting_address" className="block text-sm font-medium text-gray-700">
              Meeting Address
            </label>
            <input
              type="text"
              id="meeting_address"
              value={tourForm.meeting_point.address}
              onChange={(e) => setTourForm({ 
                ...tourForm, 
                meeting_point: { 
                  ...tourForm.meeting_point, 
                  address: e.target.value 
                } 
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="meeting_instructions" className="block text-sm font-medium text-gray-700">
              Meeting Instructions
            </label>
            <textarea
              id="meeting_instructions"
              rows={4}
              value={tourForm.meeting_point.instructions}
              onChange={(e) => setTourForm({ 
                ...tourForm, 
                meeting_point: { 
                  ...tourForm.meeting_point, 
                  instructions: e.target.value 
                } 
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Requirements</h3>
          <div>
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
              Tour Requirements
            </label>
            <textarea
              id="requirements"
              rows={4}
              value={tourForm.requirements.join('\n')}
              onChange={(e) => {
                const requirements = e.target.value.split('\n').filter(item => item.trim());
                setTourForm({ 
                  ...tourForm, 
                  requirements 
                });
              }}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm font-mono"
              placeholder="Minimum age: 18&#10;Physical fitness level: Moderate&#10;Required equipment: Hiking shoes"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter each requirement on a new line
            </p>
          </div>
        </div>

        {/* Schedule Dates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Available Dates
          </label>
          <div className="mt-2 rounded-lg border border-gray-300 bg-white shadow-sm">
            <div className="p-4 space-y-4">
              {/* Date Input */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="date"
                    value={tourForm.scheduleDates.length > 0 ? tourForm.scheduleDates[tourForm.scheduleDates.length - 1].toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      const date = new Date(e.target.value)
                      if (!isNaN(date.getTime())) {
                        setTourForm(prev => ({
                          ...prev,
                          scheduleDates: [...prev.scheduleDates, date].sort((a, b) => a.getTime() - b.getTime())
                        }))
                      }
                    }}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const today = new Date()
                    if (!tourForm.scheduleDates.some(d => d.toDateString() === today.toDateString())) {
                      setTourForm(prev => ({
                        ...prev,
                        scheduleDates: [...prev.scheduleDates, today].sort((a, b) => a.getTime() - b.getTime())
                      }))
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Today
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-7 border-b border-gray-200">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div
                      key={day}
                      className="px-2 py-3 text-center text-xs font-medium text-gray-700 bg-gray-50"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7">
                  {Array.from({ length: 35 }).map((_, index) => {
                    const date = new Date();
                    date.setDate(date.getDate() + index);
                    const isSelected = tourForm.scheduleDates.some(
                      d => d.toDateString() === date.toDateString()
                    );
                    const isToday = date.toDateString() === new Date().toDateString();

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setTourForm(prev => ({
                              ...prev,
                              scheduleDates: prev.scheduleDates.filter(
                                d => d.toDateString() !== date.toDateString()
                              )
                            }));
                          } else {
                            setTourForm(prev => ({
                              ...prev,
                              scheduleDates: [...prev.scheduleDates, date].sort(
                                (a, b) => a.getTime() - b.getTime()
                              )
                            }));
                          }
                        }}
                        className={`
                          relative h-12 border-t border-r border-gray-200 last:border-r-0
                          hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500
                          ${isSelected ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700'}
                          ${isToday ? 'font-bold' : ''}
                        `}
                      >
                        <time dateTime={date.toISOString().split('T')[0]} className="flex h-full w-full items-center justify-center">
                          {date.getDate()}
                          {isSelected && (
                            <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-600"></span>
                          )}
                        </time>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Dates */}
              {tourForm.scheduleDates.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Selected Dates</h3>
                  <div className="flex flex-wrap gap-2">
                    {tourForm.scheduleDates.map((date, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                      >
                        {date.toLocaleDateString(undefined, { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                        <button
                          type="button"
                          onClick={() => {
                            setTourForm(prev => ({
                              ...prev,
                              scheduleDates: prev.scheduleDates.filter((_, i) => i !== index)
                            }))
                          }}
                          className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-blue-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Max Tours and Guests */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="maxToursAtTime" className="block text-sm font-medium text-gray-700">
              Max Tours at a Time
            </label>
            <input
              type="number"
              id="maxToursAtTime"
              value={tourForm.availability.capacity.max_tours}
              onChange={(e) => setTourForm({ ...tourForm, availability: { ...tourForm.availability, capacity: { ...tourForm.availability.capacity, max_tours: parseInt(e.target.value) } } })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              min="1"
              required
            />
          </div>
          <div>
            <label htmlFor="maxGuests" className="block text-sm font-medium text-gray-700">
              Max Guests per Tour
            </label>
            <input
              type="number"
              id="maxGuests"
              value={tourForm.availability.capacity.max_guests}
              onChange={(e) => setTourForm({ ...tourForm, availability: { ...tourForm.availability, capacity: { ...tourForm.availability.capacity, max_guests: parseInt(e.target.value) } } })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              min="1"
              required
            />
          </div>
        </div>

        {/* Seasonal Dates */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Seasonal Availability</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Seasonal Dates
            </label>
            <div className="mt-2 space-y-4">
              {tourForm.availability.seasonal_dates.map((season, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`season-start-${index}`} className="block text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        type="date"
                        id={`season-start-${index}`}
                        value={season.start_date}
                        onChange={(e) => {
                          const newSeasons = [...tourForm.availability.seasonal_dates];
                          newSeasons[index] = { ...season, start_date: e.target.value };
                          setTourForm({
                            ...tourForm,
                            availability: {
                              ...tourForm.availability,
                              seasonal_dates: newSeasons
                            }
                          });
                        }}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor={`season-end-${index}`} className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        type="date"
                        id={`season-end-${index}`}
                        value={season.end_date}
                        onChange={(e) => {
                          const newSeasons = [...tourForm.availability.seasonal_dates];
                          newSeasons[index] = { ...season, end_date: e.target.value };
                          setTourForm({
                            ...tourForm,
                            availability: {
                              ...tourForm.availability,
                              seasonal_dates: newSeasons
                            }
                          });
                        }}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newSeasons = tourForm.availability.seasonal_dates.filter((_, i) => i !== index);
                      setTourForm({
                        ...tourForm,
                        availability: {
                          ...tourForm.availability,
                          seasonal_dates: newSeasons
                        }
                      });
                    }}
                    className="mt-6 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const today = new Date();
                  const nextMonth = new Date(today);
                  nextMonth.setMonth(today.getMonth() + 1);
                  
                  setTourForm({
                    ...tourForm,
                    availability: {
                      ...tourForm.availability,
                      seasonal_dates: [
                        ...tourForm.availability.seasonal_dates,
                        {
                          start_date: today.toISOString().split('T')[0],
                          end_date: nextMonth.toISOString().split('T')[0]
                        }
                      ]
                    }
                  });
                }}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Season
              </button>
            </div>
          </div>
        </div>

        {/* Blackout Dates */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Blackout Dates</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Unavailable Dates
            </label>
            <div className="mt-2 space-y-4">
              {tourForm.availability.blackout_dates.map((date, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => {
                        const newDates = [...tourForm.availability.blackout_dates];
                        newDates[index] = e.target.value;
                        setTourForm({
                          ...tourForm,
                          availability: {
                            ...tourForm.availability,
                            blackout_dates: newDates
                          }
                        });
                      }}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newDates = tourForm.availability.blackout_dates.filter((_, i) => i !== index);
                      setTourForm({
                        ...tourForm,
                        availability: {
                          ...tourForm.availability,
                          blackout_dates: newDates
                        }
                      });
                    }}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const today = new Date();
                  setTourForm({
                    ...tourForm,
                    availability: {
                      ...tourForm.availability,
                      blackout_dates: [
                        ...tourForm.availability.blackout_dates,
                        today.toISOString().split('T')[0]
                      ]
                    }
                  });
                }}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Blackout Date
              </button>
            </div>
          </div>
        </div>

        {/* YouTube Link */}
        <div>
          <label htmlFor="youtubeLink" className="block text-sm font-medium text-gray-700">
            YouTube Video Link (optional)
          </label>
          <input
            type="url"
            id="youtubeLink"
            value={tourForm.media.youtube_link}
            onChange={(e) => setTourForm({ ...tourForm, media: { ...tourForm.media, youtube_link: e.target.value } })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tour Images
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                >
                  <span>Upload files</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>

          {/* Image Preview Grid */}
          {tourForm.media.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {tourForm.media.images.map((image, index) => (
                <div key={index} className="relative group aspect-square">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Upload preview ${index + 1}`}
                    fill
                    className="rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -right-2 -top-2 rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? (mode === 'create' ? 'Creating...' : 'Saving...') : (mode === 'create' ? 'Create Tour' : 'Save Changes')}
          </button>
        </div>
      </form>
    </div>
  )
}
