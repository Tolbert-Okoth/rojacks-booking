import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// --- THIS IS THE FIX ---
// In development, we use the proxy ('/').
// In production, we use the live URL from the environment variable.
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL || '/',
  // --- END OF FIX ---

  prepareHeaders: (headers, { getState }) => {
    // Get the token from our local authSlice
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api', // The name of the slice in the Redux state
  baseQuery: baseQuery,
  tagTypes: ['Booking', 'Restaurant', 'Menu'], // Added Menu
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}), // Endpoints will be injected here
});