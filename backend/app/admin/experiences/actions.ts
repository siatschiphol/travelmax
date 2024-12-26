'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function fetchExperiences(sortField = `timestamps->>'created_at'`, sortDirection = 'desc') {
  try {
    const supabase = await createClient()
    
    // Get experiences - Supabase RLS will handle access control
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order(sortField, { ascending: sortDirection === 'asc' })
    
    if (error) {
      console.error('Database error:', error)
      return { success: false, error: error.message }
    }
    
    return { success: true, data: data || [] }
  } catch (error) {
    console.error('Error in fetchExperiences:', error)
    return { success: false, error: 'An error occurred while fetching experiences' }
  }
}

export async function deleteExperience(experienceId: string) {
  if (!experienceId) {
    console.error('No experienceId provided to deleteExperience');
    return { success: false, error: 'No experience ID provided' };
  }

  try {
    const cookieStore = cookies();
    const supabase = await createClient();

    // Get the current user's session
    const sessionResponse = await supabase.auth.getSession();
    if (!sessionResponse.data.session?.user) {
      console.error('No authenticated user found');
      return { success: false, error: 'You must be logged in to delete experiences' };
    }

    const userId = sessionResponse.data.session.user.id;
    console.log('Current user:', userId);
    console.log('Starting deletion for experience:', experienceId);

    // First, verify the experience exists and belongs to the user
    const { data: experience, error: fetchError } = await supabase
      .from('experiences')
      .select('id, details')
      .eq('id', experienceId)
      .single();

    if (fetchError) {
      console.error('Error fetching experience:', fetchError);
      return { success: false, error: fetchError.message };
    }

    if (!experience) {
      console.error('Experience not found:', experienceId);
      return { success: false, error: 'Experience not found' };
    }

    // Verify ownership
    if (experience.details?.created_by !== userId) {
      console.error('Experience not owned by user:', experienceId);
      return { success: false, error: 'You do not have permission to delete this experience' };
    }

    console.log('Found experience:', experience);
    console.log('Created by:', experience.details?.created_by);

    // Delete the experience
    const { error: deleteError } = await supabase
      .from('experiences')
      .delete()
      .eq('id', experienceId);

    if (deleteError) {
      console.error('Error deleting experience:', deleteError);
      return { success: false, error: deleteError.message };
    }

    // Delete images if they exist
    if (experience?.details?.media?.gallery_urls?.length > 0) {
      console.log('Deleting associated images:', experience.details.media.gallery_urls);
      for (const url of experience.details.media.gallery_urls) {
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
    revalidatePath('/admin/experiences');
    console.log('Experience deleted successfully');

    return { success: true };
  } catch (error: any) {
    console.error('Error in deleteExperience:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred while deleting the experience'
    }
  }
}

export async function createExperience(formData: any) {
  try {
    const supabase = await createClient()
    
    // Get the current user's session
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { success: false, error: 'You must be logged in to create experiences' }
    }

    // Add created_by and timestamps
    const experienceData = {
      ...formData,
      created_by: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('experiences')
      .insert(experienceData)
      .select()
      .single()

    if (error) {
      console.error('Error creating experience:', error)
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/experiences')
    return { success: true, data }
  } catch (error) {
    console.error('Error in createExperience:', error)
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred while creating the experience'
    }
  }
}
