import { serverApi } from "../serverApi";

export const accountApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout/',
        method: 'POST',
      })
    }),
    registerPhase1: builder.mutation({
      query: (data) => ({
        url: '/auth/register/phase1',
        method: 'POST',
        body: data,
      })
    }),
    registerPhase2: builder.mutation({
      query: (data) => ({
        url: '/auth/register/phase2',
        method: 'POST',
        body: data,
      })
    }),
    registerFinal: builder.mutation({
      query: (data) => ({
        url: '/auth/register/final',
        method: 'POST',
        body: data,
      })
    }),
    getAccount: builder.query({
      query: () => ({
        url: `/accounts/my-account`,
        method: 'GET',
      }),
      providesTags: (result, error, accountId) => [{ type: 'Account', id: accountId }],
    }),
    updateAccount: builder.mutation({
      query: ({ accountId, ...patch }) => ({
        url: `/accounts/${accountId}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { accountId }) => [{ type: 'Account', id: accountId }],
    }),
    deleteAccount: builder.mutation({
      query: (accountId) => ({
        url: `/accounts/${accountId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, accountId) => [{ type: 'Account', id: accountId }],
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterPhase1Mutation,
  useRegisterPhase2Mutation,
  useRegisterFinalMutation,
  useGetAccountQuery,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
} = accountApi;