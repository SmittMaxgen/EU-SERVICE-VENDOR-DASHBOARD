import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/apiInstance';

// ─── Login ────────────────────────────────────────────────────────────────────
export const loginVendor = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/vendor/login/', credentials);
    const res = response.data;
    const token = res.token || res.access || res.access_token || null;
    if (token) localStorage.setItem('token', token);
    return { ...res, token };
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Register ─────────────────────────────────────────────────────────────────
export const registerVendor = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/vendor/register/', userData, {
      headers: {
        'Content-Type': 'multipart/form-data' // ✅ correct header
      }
    });
    return response.data;
    // ✅ No token stored on register — user must login after
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Logout ───────────────────────────────────────────────────────────────────
export const logoutVendor = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    localStorage.removeItem('token');
    return true;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
