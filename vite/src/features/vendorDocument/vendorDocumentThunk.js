import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/apiInstance';

// ─── Fetch All Documents ──────────────────────────────────────────────────────
export const fetchVendorDocuments = createAsyncThunk('vendorDocument/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/vendor-documents/');
    const res = response.data;
    if (res.success && Array.isArray(res.data)) return res.data;
    if (Array.isArray(res)) return res;
    if (Array.isArray(res.results)) return res.results;
    return [];
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Fetch Single Document ────────────────────────────────────────────────────
export const fetchVendorDocumentById = createAsyncThunk('vendorDocument/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/vendor-documents/${id}/`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Create Document ──────────────────────────────────────────────────────────
export const createVendorDocument = createAsyncThunk('vendorDocument/create', async (documentData, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    Object.entries(documentData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) formData.append(key, value);
    });
    const response = await axiosInstance.post('/vendor-documents/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Update Document ──────────────────────────────────────────────────────────
export const updateVendorDocument = createAsyncThunk('vendorDocument/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) formData.append(key, value);
    });
    const response = await axiosInstance.patch(`/vendor-documents/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ─── Delete Document ──────────────────────────────────────────────────────────
export const deleteVendorDocument = createAsyncThunk('vendorDocument/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/vendor-documents/${id}/`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
