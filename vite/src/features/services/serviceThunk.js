import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/apiInstance';

// ─── Fetch All Services ───────────────────────────────────────────────────────
// export const fetchServices = createAsyncThunk('service/fetchAll', async (_, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.get('/services/');
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || error.message);
//   }
// });

export const fetchServices = createAsyncThunk('service/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/services/');
    const res = response.data;

    // ✅ handle { success: true, data: [...] }
    if (res.success && Array.isArray(res.data)) return res.data;

    // fallback handles plain array
    if (Array.isArray(res)) return res;

    // fallback handles { results: [...] } pagination
    if (Array.isArray(res.results)) return res.results;

    return [];
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Create Service ───────────────────────────────────────────────────────────
export const createService = createAsyncThunk('service/create', async (serviceData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/services/', serviceData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Update Service ───────────────────────────────────────────────────────────
export const updateService = createAsyncThunk('service/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch(`/services/${id}/`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Delete Service ───────────────────────────────────────────────────────────
export const deleteService = createAsyncThunk('service/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/services/${id}/`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
