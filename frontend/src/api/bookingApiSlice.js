import { apiSlice } from './apiSlice';

const BOOKINGS_URL = '/api/bookings';

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // --- Get All Bookings (Admin Query) ---
    getBookings: builder.query({
      query: () => ({
        url: BOOKINGS_URL,
      }),
      providesTags: ['Booking'], // Cache all bookings under this tag
    }),

    // --- Create New Booking (Public Mutation) ---
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: BOOKINGS_URL,
        method: 'POST',
        body: bookingData, // { customerName, phone, date, etc. }
      }),
      // A new booking invalidates the list, so it re-fetches
      invalidatesTags: ['Booking'], 
    }),

    // --- Update Booking Status (Admin Mutation) ---
    updateBookingStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `${BOOKINGS_URL}/${id}`,
        method: 'PUT',
        body: { status }, // e.g., { status: 'Confirmed' }
      }),
      invalidatesTags: ['Booking'],
    }),

    // --- Delete Booking (Admin Mutation) ---
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `${BOOKINGS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingStatusMutation,
  useDeleteBookingMutation,
} = bookingApiSlice;