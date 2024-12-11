import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../../RTKBackend/ApiSlices/RegisterApiSlice';
import { symptomApi} from '../ApiSlices/SymptomApliSlice';
import { imageApi } from '../ApiSlices/UploadImagesSlice';
// import {userinfoApi } from '../ApiSlices/ProfileInfoSlice';
export  default  store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [symptomApi.reducerPath]: symptomApi.reducer,
        [imageApi.reducerPath]: imageApi.reducer,
        // [userinfoApi.reducerPath]: userinfoApi.reducer,



      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(apiSlice.middleware)
        .concat(symptomApi.middleware)
        .concat(imageApi.middleware)
        // .concat(userinfoApi.middleware),

});