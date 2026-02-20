import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/apiInstance';

// ─── Fetch All Vendor Services ────────────────────────────────────────────────
// export const fetchVendorServices = createAsyncThunk('vendorService/fetchAll', async (_, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.get('/vendor-services/');
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || error.message);
//   }
// });

export const fetchVendorServices = createAsyncThunk('vendorService/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/vendor-services/');
    const res = response.data;

    // ✅ your API returns { success: true, data: [...] }
    if (res.success && Array.isArray(res.data)) return res.data;

    // fallback handles plain array too
    if (Array.isArray(res)) return res;

    // fallback handles { results: [...] } pagination
    if (Array.isArray(res.results)) return res.results;

    return [];
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Create Vendor Service ────────────────────────────────────────────────────
export const createVendorService = createAsyncThunk('vendorService/create', async (vendorServiceData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/vendor-services/', vendorServiceData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Update Vendor Service ────────────────────────────────────────────────────
export const updateVendorService = createAsyncThunk('vendorService/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch(`/vendor-services/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data' // ✅ override axios default
      }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Delete Vendor Service ────────────────────────────────────────────────────
export const deleteVendorService = createAsyncThunk('vendorService/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/vendor-services/${id}/`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
