import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const env = process.env.NODE_ENV;
const baseUrl = env === 'production' ? process.env.NEXT_PUBLIC_SERVER_URL_PROD : process.env.NEXT_PUBLIC_SERVER_URL_DEV;

export const serverApi =  createApi({
  reducerPath: "serverApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: [
    'Account',
    'User',
    'Role',
    'CharacterModel',
    'Chat',
    'Message',
    'CallHistory',
  ],
  endpoints: (builder) => ({})
})
