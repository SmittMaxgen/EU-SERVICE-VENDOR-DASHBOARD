import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBookingRequests,
  fetchBookingRequestById,
  createBookingRequest,
  updateBookingRequest,
  deleteBookingRequest
} from './bookingRequestThunk';

const initialState = {
  bookingRequests: [],
  selectedBookingRequest: null,
  loading: false,
  error: null,
  successMessage: null
};

const bookingRequestSlice = createSlice({
  name: 'bookingRequest',
  initialState,
  reducers: {
    setSelectedBookingRequest(state, action) {
      state.selectedBookingRequest = action.payload;
    },
    clearSelectedBookingRequest(state) {
      state.selectedBookingRequest = null;
    },
    clearBookingRequestMessages(state) {
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    // ─── Fetch All ──────────────────────────────────────────────────────────
    builder
      .addCase(fetchBookingRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingRequests = action.payload;
      })
      .addCase(fetchBookingRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Fetch By ID ────────────────────────────────────────────────────────
    builder
      .addCase(fetchBookingRequestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingRequestById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBookingRequest = action.payload;
      })
      .addCase(fetchBookingRequestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Create ─────────────────────────────────────────────────────────────
    builder
      .addCase(createBookingRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBookingRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingRequests.push(action.payload);
        state.successMessage = 'Booking request created successfully!';
      })
      .addCase(createBookingRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Update ─────────────────────────────────────────────────────────────
    builder
      .addCase(updateBookingRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookingRequest.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookingRequests.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) state.bookingRequests[index] = action.payload;
        state.successMessage = 'Booking request updated successfully!';
      })
      .addCase(updateBookingRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Delete ─────────────────────────────────────────────────────────────
    builder
      .addCase(deleteBookingRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBookingRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingRequests = state.bookingRequests.filter((r) => r.id !== action.payload);
        state.successMessage = 'Booking request deleted successfully!';
      })
      .addCase(deleteBookingRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSelectedBookingRequest, clearSelectedBookingRequest, clearBookingRequestMessages } = bookingRequestSlice.actions;
export default bookingRequestSlice.reducer;
