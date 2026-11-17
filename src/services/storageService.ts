import { resizeImageToJpeg } from '../lib/imageResize'
import { supabase } from '../lib/supabaseClient'

// Resizes a photo in the browser, uploads it to the public "images" bucket under a
// unique name, and returns the storage path to save in the database row.
export async function uploadSiteImage(
  file: File,
  folder: string,
  slug: string,
  maxWidth = 1600,
): Promise<string> {
  const blob = await resizeImageToJpeg(file, maxWidth)
  const path = `${folder}/${slug}-${Date.now()}.jpg`
  const { error } = await supabase.storage
    .from('images')
    .upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000' })
  if (error) throw new Error(error.message)
  return path
}