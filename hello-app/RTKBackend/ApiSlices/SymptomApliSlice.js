
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create an API slice for matching symptoms
export const symptomApi = createApi({
  reducerPath: 'symptomApi',
  baseQuery: fetchBaseQuery({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.137.1:5001/api/' }), // Replace with your backend API URL
  }),
  endpoints: (builder) => ({
    // Endpoint for matching symptoms
    matchSymptoms: builder.mutation({
      query: ({ email, symptoms }) => ({
        url: 'symptoms/match',
        method: 'POST',
        body: { email, symptoms },
      }),
    }),
  }),
});

export const { useMatchSymptomsMutation } = symptomApi;




