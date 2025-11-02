import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice' // Import the parent API slice
import authReducer from './authSlice'       // Import the local auth slice

export const store = configureStore({
  reducer: {
    // Add the generated reducer path from RTK Query
    [apiSlice.reducerPath]: apiSlice.reducer,
    // Add your local auth slice reducer
    auth: authReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true, // Enable Redux DevTools
})