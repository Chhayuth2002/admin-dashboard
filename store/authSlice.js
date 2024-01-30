import { createSlice } from '@reduxjs/toolkit'
import { loginAsync } from './authAsyncActions'

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload?.user
        state.token = action.payload?.token
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })
  }
})

export default authSlice.reducer
export const { logout } = authSlice.actions
