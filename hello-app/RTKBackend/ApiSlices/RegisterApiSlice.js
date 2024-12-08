import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.137.1:5001/api/' }), // Ensure this IP is correct
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) => ({
                url: 'auth/register',
                method: 'POST',
                body: user,
            }),
        }),
        verifyUser: builder.mutation({
            query: (verificationData) => ({
                url: 'auth/verify',
                method: 'POST',
                body: verificationData,
            }),
        }),
        resendOtp: builder.mutation({
            query: (email) => ({
                url: 'auth/resend-otp',
                method: 'POST',
                body: { email },
            }),
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
              url: 'auth/login',
              method: 'POST',
              body: credentials,
            }),
          }),
          fetchName: builder.query({
            query: (email) => `auth/get-name?email=${email}`,
          }),
    }),
});
export const { useRegisterUserMutation, useVerifyUserMutation, useResendOtpMutation,useLoginUserMutation,useFetchNameQuery} = apiSlice;
