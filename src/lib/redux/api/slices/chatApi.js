import { createClient } from "@/utils/supabase/client";
import { serverApi } from "../serverApi";

const supabase = createClient();
export const chatApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => ({
        url: '/chats',
        method: 'GET',
        params: { sortOrder: 'desc' },
      }),
      providesTags: (result) => [({ type: 'Chat', id: 'LIST' })],
      transformResponse(rawData) {
        const chatsArray = rawData.data;

        if (!Array.isArray(chatsArray)) {
          console.error('Expected an array of chats');
          return [];
        }

        const chatsData = chatsArray.map((contact) => {
          let finalImageUrl = '/assets/default_profile_image.png';
          if (contact.profileImage) {
            const { data, error } = supabase.storage.from('profile-image-storage').getPublicUrl(contact.profileImage);
            finalImageUrl = data.publicUrl;
          }

          return {
            ...contact,
            profileImage: finalImageUrl,
          };

        });

        rawData.data = chatsData;
        return rawData;
      },
    }),
    getChatById: builder.query({
      query: (chatId) => ({
        url: `/chats/${chatId}`,
        method: 'GET',
      }),
      providesTags: (result, error, chatId) => [{ type: 'Chat', id: chatId }],
    }),
    getContacts: builder.query({
      query: (search) => ({
        url: '/chats/contacts',
        method: 'GET',
        params: { search },
      }),
      providesTags: (result) => [({ type: 'Chat', id: 'LIST' })],
      transformResponse(rawData) {
        const contactsArray = rawData.data;

        if (!Array.isArray(contactsArray)) {
          console.error('Expected an array of contacts');
          return [];
        }

        const contactsData = contactsArray.map((contact) => {
          let finalImageUrl = '/assets/default_profile_image.png';
          if (contact.profileImage) {
            const { data, error } = supabase.storage.from('profile-image-storage').getPublicUrl(contact.profileImage);
            finalImageUrl = data.publicUrl;
          }

          return {
            ...contact,
            profileImage: finalImageUrl,
          };

        });

        rawData.data = contactsData;
        return rawData;
      },
    }),
    createChat: builder.mutation({
      query: (newChat) => ({
        url: '/chats',
        method: 'POST',
        body: newChat,
      }),
      invalidatesTags: [{ type: 'Chat', id: 'LIST' }],
    }),
    updateChat: builder.mutation({
      query: ({ chatId, ...patch }) => ({
        url: `/chats/${chatId}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { chatId }) => [{ type: 'Chat', id: chatId }],
    }),
    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `/chats/${chatId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, chatId) => [{ type: 'Chat', id: chatId }, { type: 'Chat', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetChatsQuery,
  useGetChatByIdQuery,
  useGetContactsQuery,
  useCreateChatMutation,
  useUpdateChatMutation,
  useDeleteChatMutation,
} = chatApi;