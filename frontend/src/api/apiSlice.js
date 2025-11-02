import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Note: An empty base URL is fine because we're using a proxy
// The proxy in vite.config.js will prepend 'http://localhost:5000'
const baseQuery = fetchBaseQuery({
  baseUrl: '/', // Was '/api', but proxy handles it. Let's set to '/' for simplicity.
  prepareHeaders: (headers, { getState }) => {
    // Get the token from our local authSlice
    const token = getState().auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const apiSlice = createApi({
  reducerPath: 'api', // The name of the slice in the Redux state
  baseQuery: baseQuery,
  tagTypes: ['Booking', 'Restaurant'], // Used for Caching
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}), // Endpoints will be injected here
}) 