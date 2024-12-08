import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../../RTKBackend/ApiSlices/RegisterApiSlice';
import { symptomApi } from '../ApiSlices/SymtomsSlice';
import { imageApi } from '../ApiSlices/UploadImagesSlice';
export  default  store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [symptomApi.reducerPath]: symptomApi.reducer,
        [imageApi.reducerPath]: imageApi.reducer,


      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(apiSlice.middleware)
        .concat(symptomApi.middleware)
        .concat(imageApi.middleware),
});