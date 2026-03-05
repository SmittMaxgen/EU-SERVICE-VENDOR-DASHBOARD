import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/apiInstance';

// ─── Fetch All Booking Requests ───────────────────────────────────────────────
// Pass vendor_id to filter:  dispatch(fetchBookingRequests({ vendor_id: 15 }))
// Pass nothing for all:      dispatch(fetchBookingRequests())
export const fetchBookingRequests = createAsyncThunk('bookingRequest/fetchAll', async (params = {}, { rejectWithValue }) => {
  try {
    // Build query string dynamically — e.g. ?vendor_id=15
    const query = new URLSearchParams();
    if (params.vendor_id) query.append('vendor_id', params.vendor_id);
    if (params.booking_id) query.append('booking_id', params.booking_id);
    if (params.request_status) query.append('request_status', params.request_status);

    const url = `/booking-requests/${query.toString() ? `?${query.toString()}` : ''}`;
    const response = await axiosInstance.get(url);
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

// ─── Fetch Single Booking Request ─────────────────────────────────────────────
export const fetchBookingRequestById = createAsyncThunk('bookingRequest/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/booking-requests/${id}/`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Create Booking Request ───────────────────────────────────────────────────
export const createBookingRequest = createAsyncThunk('bookingRequest/create', async (requestData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/booking-requests/', requestData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Update Booking Request ───────────────────────────────────────────────────
export const updateBookingRequest = createAsyncThunk('bookingRequesst/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch(`/booking-requests/${id}/`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Delete Booking Request ───────────────────────────────────────────────────
export const deleteBookingRequest = createAsyncThunk('bookingRequest/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/booking-requests/${id}/`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
