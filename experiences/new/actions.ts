'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function createTour(tourData: any) {
  try {
    const cookieStore = cookies();
    const supabase = await createClient();

    // Get the current user's session
    const sessionResponse = await supabase.auth.getSession();
    if (!sessionResponse.data.session?.user) {
      console.error('No authenticated user found');
      return { success: false, error: 'You must be logged in to create a tour' };
    }

    const userId = sessionResponse.data.session.user.id;
    console.log('Creating tour as user:', userId);

    // Prepare the listing data with title and created_by
    const listingDataWithUser = {
      ...tourData,
      created_by: userId,
      title: tourData.title || 'Untitled Tour' // Ensure title is set
    };

    console.log('Creating listing with data:', listingDataWithUser);

    // Insert the tour with created_by field
    const { data, error: insertError } = await supabase
      .from('experiences')
      .insert([listingDataWithUser])
      .select()
      .single();

    if (insertError) {
      console.error('Error creating tour:', insertError);
      return { success: false, error: insertError.message };
    }

    console.log('Created listing:', data);

    revalidatePath('/admin/listings');
    return { success: true, data };
  } catch (error: any) {
    console.error('Error in createTour:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred while creating the tour'
    };
  }
}

export async function updateTour(tourId: string, tourData: any) {
  try {
    const cookieStore = cookies();
    const supabase = await createClient();

    // Get the current user's session
    const sessionResponse = await supabase.auth.getSession();
    if (!sessionResponse.data.session?.user) {
      console.error('No authenticated user found');
      return { success: false, error: 'You must be logged in to update a tour' };
    }

    const userId = sessionResponse.data.session.user.id;
    console.log('Updating tour as user:', userId);

    const { data, error: updateError } = await supabase
      .from('experiences')
      .update(tourData)
      .eq('id', tourId)
      .eq('created_by', userId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating tour:', updateError);
      return { success: false, error: updateError.message };
    }

    revalidatePath('/admin/listings');
    return { success: true, data };
  } catch (error: any) {
    console.error('Error in updateTour:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred while updating the tour'
    };
  }
}

export async function deleteTour(tourId: string) {
  if (!tourId) {
    console.error('No tourId provided to deleteTour');
    return { success: false, error: 'No tour ID provided' };
  }

  try {
    console.log('Starting deletion for tour:', tourId);
    const supabase = await createClient()

    // First, get the tour data to get image URLs
    const { data: tour, error: fetchError } = await supabase
      .from('experiences')
      .select('details')
      .eq('id', tourId)
      .single();

    if (fetchError) {
      console.error('Error fetching tour for deletion:', fetchError);
      return { success: false, error: fetchError.message };
    }

    console.log('Found tour to delete:', tour);

    // Delete the tour
    const { error: deleteError } = await supabase
      .from('experiences')
      .delete()
      .eq('id', tourId);

    if (deleteError) {
      console.error('Error deleting tour:', deleteError);
      return { success: false, error: deleteError.message };
    }

    // Delete associated images
    if (tour?.details?.media?.gallery_urls?.length > 0) {
      console.log('Deleting associated images:', tour.details.media.gallery_urls);
      const deletePromises = tour.details.media.gallery_urls.map(url => {
        const path = url.split('/').pop()
        return path ? supabase.storage.from('tour-images').remove([path]) : Promise.resolve()
      })
      await Promise.allSettled(deletePromises)
    }

    // Revalidate the listings page
    revalidatePath('/admin/listings')
    console.log('Tour deleted successfully');

    return { success: true }
  } catch (error: any) {
    console.error('Error in deleteTour:', error)
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred while deleting the tour'
    }
  }
}
