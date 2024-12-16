import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const imageApi = createApi({
  reducerPath: 'imgApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.142.70:5000/api/' }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: ({ email, imageFile }) => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('image', imageFile);

        return {
          url: 'upload/upload-image',
          method: 'POST',
          body: formData,
        };
      },
    }),
    fetchUserImage: builder.query({
      query: (email) => `upload/load-image/${email}`, 
    }),
  }),
});

export const { useUploadImageMutation , useFetchUserImageQuery  } = imageApi;
