'use server'

import { createAdminClient } from "@/utils/supabase/admin";

const supabaseAdmin = createAdminClient()

export async function uploadImageToSupabase(image, imageName) {
  const fileImage = image;

  const {data, error} = await supabaseAdmin.storage.from('profile-image-storage').upload(imageName, image);

  if(error) {
    return {error: error.message}
  }

  return {path: data.path};
}

// export async function getImageUrlFromSupabase(imagePath) {
//   const {data, error} = supabase.storage.from('profile-image-storage').getPublicUrl(imagePath);

//   if(error) {
//     return {error: error.message}
//   }

//   return {publicUrl: data.publicUrl};
// }