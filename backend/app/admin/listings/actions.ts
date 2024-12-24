'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function fetchListings(sortField = 'created_at', sortDirection = 'desc') {
  try {
    const cookieStore = cookies();
    const supabase = await createClient();

    // Get the current user's session
    const sessionResponse = await supabase.auth.getSession();
    if (!sessionResponse.data.session?.user) {
      console.error('No authenticated user found');
      return { success: false, error: 'You must be logged in to view listings' };
    }

    const userId = sessionResponse.data.session.user.id;
    console.log('Fetching listings for user:', userId);

    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order(sortField, { ascending: sortDirection === 'asc' });

    if (error) {
      console.error('Error fetching listings:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('Error in fetchListings:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred while fetching listings'
    };
  }
}

export async function deleteListing(listingId: string) {
  if (!listingId) {
    console.error('No listingId provided to deleteListing');
    return { success: false, error: 'No listing ID provided' };
  }

  try {
    const cookieStore = cookies();
    const supabase = await createClient();

    // Get the current user's session
    const sessionResponse = await supabase.auth.getSession();
    if (!sessionResponse.data.session?.user) {
      console.error('No authenticated user found');
      return { success: false, error: 'You must be logged in to delete listings' };
    }

    const userId = sessionResponse.data.session.user.id;
    console.log('Current user:', userId);
    console.log('Starting deletion for listing:', listingId);

    // First, verify the listing exists and belongs to the user
    const { data: listing, error: fetchError } = await supabase
      .from('listings')
      .select('id, details, created_by')
      .eq('id', listingId)
      .eq('created_by', userId)
      .single();

    if (fetchError) {
      console.error('Error fetching listing:', fetchError);
      return { success: false, error: fetchError.message };
    }

    if (!listing) {
      console.error('Listing not found or not owned by user:', listingId);
      return { success: false, error: 'Listing not found or you do not have permission to delete it' };
    }

    console.log('Found listing:', listing);
    console.log('Created by:', listing.created_by);

    // Delete the listing
    const { error: deleteError } = await supabase
      .from('listings')
      .delete()
      .eq('id', listingId)
      .eq('created_by', userId);

    if (deleteError) {
      console.error('Error deleting listing:', deleteError);
      return { success: false, error: deleteError.message };
    }

    // Delete images if they exist
    if (listing?.details?.media?.gallery_urls?.length > 0) {
      console.log('Deleting associated images:', listing.details.media.gallery_urls);
      for (const url of listing.details.media.gallery_urls) {
        const path = url.split('/').pop();
        if (path) {
          const { error: storageError } = await supabase.storage
            .from('tour-images')
            .remove([path]);
          
          if (storageError) {
            console.error('Error deleting image:', path, storageError);
            // Continue with other deletions even if one fails
          }
        }
      }
    }

    // Revalidate the page
    revalidatePath('/admin/listings');
    console.log('Listing deleted successfully');

    return { success: true };
  } catch (error: any) {
    console.error('Error in deleteListing:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred while deleting the listing'
    }
  }
}
