'use client'

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"

const supabase = createClient();

export const useGetProfileImage = (imagePath) => {
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const { data, error } = supabase.storage.from('profile-image-storage').getPublicUrl(imagePath);

        if (error) {
          setError(error.message);
        } else {
          setProfileImageUrl(data.publicUrl);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (imagePath) {
      fetchProfileImage();
    } else {
      setIsLoading(false);
    }
  }, [imagePath]);

  return { profileImageUrl, isLoading, error };
}