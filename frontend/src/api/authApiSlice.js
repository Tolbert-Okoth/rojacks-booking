import { apiSlice } from './apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // --- Login Mutation ---
    login: builder.mutation({
      // `query` defines the request
      query: (credentials) => ({
        url: '/api/auth/login', // Uses proxy
        method: 'POST',
        body: credentials, // e.g., { email, password }
      }),
      // We don't need to invalidate/provide tags here
      // as logging in doesn't typically change cached server data
    }),

    // --- (Optional) Register Mutation ---
    // We can add this if you want a public registration page
    // register: builder.mutation({
    //   query: (userInfo) => ({
    //     url: '/api/auth/register',
    //     method: 'POST',
    //     body: userInfo,
    //   }),
    // }),
    
  }),
});

// RTK Query automatically generates hooks based on the endpoint names
export const {
  useLoginMutation,
  // useRegisterMutation 
} = authApiSlice;