import { serverApi } from "../serverApi";
import { transformMessageData } from "@/utils/supabase/transfornMessageData";

export const messageApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (params) => ({
        url: `/messages`,
        method: 'GET',
        params: params,
      }),
      providesTags: (result, error, conversationId) => [{ type: 'Message', id: conversationId }],
      transformResponse(rawData) {
        const messagesArray = rawData.data;

        if (!Array.isArray(messagesArray)) {
          console.error('Expected an array of messages');
          return [];
        }

        const messagesData =  messagesArray.map(transformMessageData)

        rawData.data = messagesData;
        return rawData;
      },
    }),
    sendMessage: builder.mutation({
      query: (newMessage) => ({
        url: '/messages',
        method: 'POST',
        body: newMessage,
      }),
      invalidatesTags: (result, error, { conversationId }) => [{ type: 'Message', id: conversationId }],
    }),
    updateMessage: builder.mutation({
      query: ({ messageId, ...patch }) => ({
        url: `/messages/${messageId}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { conversationId }) => [{ type: 'Message', id: conversationId }],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
} = messageApi;