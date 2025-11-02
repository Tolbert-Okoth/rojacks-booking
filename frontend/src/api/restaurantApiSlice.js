import { apiSlice } from './apiSlice';

// We'll use a constant for the URL since there's only one restaurant
const RESTAURANT_URL = '/api/restaurants';

export const restaurantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // --- Get Restaurant Details (Query) ---
    getRestaurant: builder.query({
      query: () => ({
        url: RESTAURANT_URL, // Gets the first restaurant
      }),
      // 'Restaurant' tag is for caching. 
      // If we update, this query will re-fetch.
      providesTags: ['Restaurant'], 
    }),

    // --- Update Restaurant Details (Mutation) ---
    updateRestaurant: builder.mutation({
      query: (data) => ({
        url: `${RESTAURANT_URL}/${data.id}`, // e.g., /api/restaurants/1
        method: 'PUT',
        body: data,
      }),
      // On success, invalidate the 'Restaurant' tag to force a re-fetch
      invalidatesTags: ['Restaurant'], 
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetRestaurantQuery,
  useUpdateRestaurantMutation,
} = restaurantApiSlice;