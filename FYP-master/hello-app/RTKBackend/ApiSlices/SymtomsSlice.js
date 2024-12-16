import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define your API slice
export const symptomApi = createApi({
  reducerPath: 'symptomApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.33.70:5000/api/' }), // Change this to your backend base URL
  endpoints: (builder) => ({
    matchSymptoms: builder.mutation({
      query: (symptoms) => ({
        url: 'symptoms/match-symptoms',  // API endpoint for matching symptoms
        method: 'POST',
        body: {symptoms},  // Payload containing the selected symptoms
      }),
    }),
    fetchMatchedSymptoms: builder.query({
      query: () => 'symptoms/match-symptoms', // API endpoint to fetch matched symptoms
    }),
  }),
});

// Export the generated hook
export const { useMatchSymptomsMutation,useFetchMatchedSymptomsQuery } = symptomApi;
