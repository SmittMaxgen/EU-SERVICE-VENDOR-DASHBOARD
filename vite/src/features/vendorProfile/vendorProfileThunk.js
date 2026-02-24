import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/apiInstance';

// ─── Fetch All Vendors ────────────────────────────────────────────────────────
export const fetchVendors = createAsyncThunk('vendor/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/vendor/profile');
    const res = response.data;
    if (res.success && Array.isArray(res.data)) return res.data;
    if (Array.isArray(res)) return res;
    if (Array.isArray(res.results)) return res.results;
    return [];
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Fetch Single Vendor ──────────────────────────────────────────────────────
// export const fetchVendorById = createAsyncThunk('vendor/fetchProfile', async (_, { rejectWithValue }) => {
//   try {
//     const token = localStorage.getItem('token');

//     const response = await axiosInstance.get('/vendor/profile/');
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || error.message);
//   }
// });

export const fetchVendorById = createAsyncThunk('vendor/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axiosInstance.get('/vendor/profile/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Create Vendor ────────────────────────────────────────────────────────────
export const createVendor = createAsyncThunk('vendor/create', async (vendorData, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    Object.entries(vendorData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) formData.append(key, value);
    });
    const response = await axiosInstance.post('/vendor/profile/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Update Vendor ────────────────────────────────────────────────────────────
export const updateVendor = createAsyncThunk('vendor/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) formData.append(key, value);
    });
    const response = await axiosInstance.patch(`/vendor/profile/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Delete Vendor ────────────────────────────────────────────────────────────
export const deleteVendor = createAsyncThunk('vendor/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/vendor/profile/${id}/`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
