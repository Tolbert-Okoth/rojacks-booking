import { createSlice } from '@reduxjs/toolkit'

// Get user info from localStorage if it exists
const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userInfo: userInfo,
  token: userInfo ? userInfo.token : null, // Extract token for easy access
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set credentials (user info + token)
    setCredentials: (state, action) => {
      state.userInfo = action.payload
      state.token = action.payload.token
      // Save to localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    // Action to log out
    logOut: (state) => {
      state.userInfo = null
      state.token = null
      localStorage.removeItem('userInfo')
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

// Selectors
export const selectCurrentUser = (state) => state.auth.userInfo
export const selectCurrentToken = (state) => state.auth.token