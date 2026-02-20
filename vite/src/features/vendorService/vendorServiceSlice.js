import { createSlice } from '@reduxjs/toolkit';
import { fetchVendorServices, createVendorService, updateVendorService, deleteVendorService } from './vendorServiceThunk';

const initialState = {
  vendorServices: [],
  selectedVendorService: null,
  loading: false,
  error: null,
  successMessage: null
};

const vendorServiceSlice = createSlice({
  name: 'vendorService',
  initialState,
  reducers: {
    setSelectedVendorService(state, action) {
      state.selectedVendorService = action.payload;
    },
    clearSelectedVendorService(state) {
      state.selectedVendorService = null;
    },
    clearVendorServiceMessages(state) {
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    // ─── Fetch All ──────────────────────────────────────────────────────────
    builder
      .addCase(fetchVendorServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorServices.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorServices = action.payload;
      })
      .addCase(fetchVendorServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Create ─────────────────────────────────────────────────────────────
    builder
      .addCase(createVendorService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVendorService.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorServices.push(action.payload);
        state.successMessage = 'Vendor service created successfully!';
      })
      .addCase(createVendorService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Update ─────────────────────────────────────────────────────────────
    builder
      .addCase(updateVendorService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVendorService.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.vendorServices.findIndex((vs) => vs.id === action.payload.id);
        if (index !== -1) state.vendorServices[index] = action.payload;
        state.successMessage = 'Vendor service updated successfully!';
      })
      .addCase(updateVendorService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Delete ─────────────────────────────────────────────────────────────
    builder
      .addCase(deleteVendorService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVendorService.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorServices = state.vendorServices.filter((vs) => vs.id !== action.payload);
        state.successMessage = 'Vendor service deleted successfully!';
      })
      .addCase(deleteVendorService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSelectedVendorService, clearSelectedVendorService, clearVendorServiceMessages } = vendorServiceSlice.actions;
export default vendorServiceSlice.reducer;
