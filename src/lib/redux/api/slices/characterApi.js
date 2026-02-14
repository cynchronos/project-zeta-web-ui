import { createClient } from "@/utils/supabase/client"; 
import { serverApi } from "../serverApi";

const supabase = createClient();
export const chatApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: () => ({
        url: '/characters',
        method: 'GET',
      }),
      providesTags: (result) => [({ type: 'Character', id: 'LIST' })],
      transformResponse(rawData) {
        const charactersArray = rawData.data;

        if (!Array.isArray(charactersArray)) {
          console.error('Expected an array of characters');
          return [];
        }

        const charactersData = charactersArray.map((character) => {
          let finalImageUrl = '/assets/default_character_image.png';
          if (character.image) {
            const { data, error } = supabase.storage.from('character-image-storage').getPublicUrl(character.image);
            finalImageUrl = data.publicUrl;
          }

          return {
            ...character,
            image: finalImageUrl,
          };

        });

        rawData.data = charactersData;
        return rawData;
      },
    }),
  }),
 });