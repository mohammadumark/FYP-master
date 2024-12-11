// features/api/userSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create an API slice for user information
export const userinfoApi = createApi({
  reducerPath: 'userinfoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.137.1:5001/api/' }), // Replace with your backend URL
  endpoints: (builder) => ({
    addUserInfo: builder.mutation({
      query: (userInfo) => ({
        url: 'Profile/user-info',
        method: 'POST',
        body: userInfo,
      }),
    }),
    fetchUserInfo: builder.query({
      query: (email) => `Profile/user-info?email=${email}`, // Corrected the syntax for the query URL
    }),
    
  }),
});

// Export the hook to use the mutation in your component
export const { useAddUserInfoMutation,useFetchUserInfoQuery  } = userinfoApi;