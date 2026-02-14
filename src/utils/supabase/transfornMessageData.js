const { createClient } = require("./client");


const supabase = createClient();

export function transformMessageData(message) {
  if (message.sender.profileImage) {
    const { data, error } = supabase.storage.from('profile-image-storage').getPublicUrl(message.sender.profileImage);
    const imageUrl = data.publicUrl;

    return {
      ...message,
      sender: {
        ...message.sender,
        profileImage: imageUrl,
      },
    }
  }

  return {
      ...message,
      sender: {
        ...message.sender,
        profileImage: '/assets/images/default_profile.webp',
      },
    }
}