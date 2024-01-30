import { createAsyncThunk } from '@reduxjs/toolkit'
import { authLogin } from '@/app/api/auth'

export const loginAsync = createAsyncThunk('auth/login', async data => {
  try {
    const response = await authLogin(data)
    return response
  } catch (error) {
    throw error.response.data.message
  }
})
