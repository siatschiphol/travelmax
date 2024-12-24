import { createClient } from '@/utils/supabase/client'

export async function uploadTourImages(images: File[]) {
  const supabase = createClient()
  const imageUrls: string[] = []

  if (images.length > 0) {
    console.log(`Uploading ${images.length} images...`)
    
    for (const image of images) {
      // Validate file size (10MB limit)
      if (image.size > 10 * 1024 * 1024) {
        throw new Error(`Image ${image.name} exceeds 10MB size limit`)
      }

      const fileExt = image.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`

      console.log('Uploading image:', fileName)

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('tour-images')
        .upload(fileName, image)

      if (uploadError) {
        console.error('Image upload error:', uploadError)
        throw new Error(`Failed to upload image ${image.name}: ${uploadError.message}`)
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('tour-images')
        .getPublicUrl(fileName)
        
      imageUrls.push(publicUrl)
      console.log('Successfully uploaded image:', publicUrl)
    }
  }

  return imageUrls
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}
