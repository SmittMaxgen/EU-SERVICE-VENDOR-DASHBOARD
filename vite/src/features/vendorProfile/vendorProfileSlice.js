import { createSlice } from '@reduxjs/toolkit';
import { fetchVendors, fetchVendorById, createVendor, updateVendor, deleteVendor } from './vendorProfileThunk';

const initialState = {
  vendors: [],
  selectedVendor: null,
  loading: false,
  error: null,
  successMessage: null
};

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    setSelectedVendor(state, action) {
      state.selectedVendor = action.payload;
    },
    clearSelectedVendor(state) {
      state.selectedVendor = null;
    },
    clearVendorMessages(state) {
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    // ─── Fetch All ────────────────────────────────────────────────────────────
    builder
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Fetch By ID ──────────────────────────────────────────────────────────
    builder
      .addCase(fetchVendorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedVendor = action.payload;
      })
      .addCase(fetchVendorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Create ───────────────────────────────────────────────────────────────
    builder
      .addCase(createVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors.push(action.payload);
        state.successMessage = 'Vendor created successfully!';
      })
      .addCase(createVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Update ───────────────────────────────────────────────────────────────
    builder
      .addCase(updateVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.vendors.findIndex((v) => v.id === action.payload.id);
        if (index !== -1) state.vendors[index] = action.payload;
        state.selectedVendor = action.payload;
        state.successMessage = 'Vendor updated successfully!';
      })
      .addCase(updateVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Delete ───────────────────────────────────────────────────────────────
    builder
      .addCase(deleteVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = state.vendors.filter((v) => v.id !== action.payload);
        state.successMessage = 'Vendor deleted successfully!';
      })
      .addCase(deleteVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSelectedVendor, clearSelectedVendor, clearVendorMessages } = vendorSlice.actions;
export default vendorSlice.reducer;
