import { apiSlice } from './apiSlice';

const MENUS_URL = '/api/menus';

export const menuApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // --- Get All Menu Items (Query) ---
    getMenus: builder.query({
      query: () => ({
        url: MENUS_URL,
      }),
      // Use the 'Menu' tag for caching
      providesTags: ['Menu'], 
      keepUnusedDataFor: 5 // Keep data for 5 seconds
    }),

    // --- Create Menu Item (Admin Mutation) ---
    createMenuItem: builder.mutation({
      query: (menuItemData) => ({
        url: MENUS_URL,
        method: 'POST',
        body: menuItemData,
      }),
      invalidatesTags: ['Menu'], // Force re-fetch of menu list
    }),

    // --- Update Menu Item (Admin Mutation) ---
    updateMenuItem: builder.mutation({
      query: (data) => ({
        url: `${MENUS_URL}/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Menu'],
    }),

    // --- Delete Menu Item (Admin Mutation) ---
    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: `${MENUS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Menu'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetMenusQuery,
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} = menuApiSlice;