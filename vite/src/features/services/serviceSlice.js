import { createSlice } from '@reduxjs/toolkit';
import { fetchServices, createService, updateService, deleteService } from './serviceThunk';

const initialState = {
  services: [],
  selectedService: null,
  loading: false,
  error: null,
  successMessage: null
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setSelectedService(state, action) {
      state.selectedService = action.payload;
    },
    clearSelectedService(state) {
      state.selectedService = null;
    },
    clearServiceMessages(state) {
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    // ─── Fetch All ──────────────────────────────────────────────────────────
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Create ─────────────────────────────────────────────────────────────
    builder
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload);
        state.successMessage = 'Service created successfully!';
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Update ─────────────────────────────────────────────────────────────
    builder
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.services.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.services[index] = action.payload;
        state.successMessage = 'Service updated successfully!';
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Delete ─────────────────────────────────────────────────────────────
    builder
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter((s) => s.id !== action.payload);
        state.successMessage = 'Service deleted successfully!';
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSelectedService, clearSelectedService, clearServiceMessages } = serviceSlice.actions;
export default serviceSlice.reducer;
