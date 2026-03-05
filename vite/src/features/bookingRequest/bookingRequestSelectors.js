// ─── Base Selector ───────────────────────────────────────────────────────────
export const selectBookingRequestState = (state) => state.bookingRequest;

// ─── All Booking Requests ─────────────────────────────────────────────────────
export const selectAllBookingRequests = (state) => state.bookingRequest.bookingRequests;

// ─── Selected Booking Request ─────────────────────────────────────────────────
export const selectSelectedBookingRequest = (state) => state.bookingRequest.selectedBookingRequest;

// ─── Loading ──────────────────────────────────────────────────────────────────
export const selectBookingRequestLoading = (state) => state.bookingRequest.loading;

// ─── Error ────────────────────────────────────────────────────────────────────
export const selectBookingRequestError = (state) => state.bookingRequest.error;

// ─── Success Message ──────────────────────────────────────────────────────────
export const selectBookingRequestSuccess = (state) => state.bookingRequest.successMessage;

// ─── Requests By Status ───────────────────────────────────────────────────────
export const selectBookingRequestsByStatus = (status) => (state) =>
  state.bookingRequest.bookingRequests.filter((r) => r.request_status === status);

// ─── Sent Requests Only ───────────────────────────────────────────────────────
export const selectSentBookingRequests = (state) => state.bookingRequest.bookingRequests.filter((r) => r.request_status === 'sent');

// ─── Accepted Requests Only ───────────────────────────────────────────────────
export const selectAcceptedBookingRequests = (state) => state.bookingRequest.bookingRequests.filter((r) => r.request_status === 'accepted');

// ─── Rejected Requests Only ───────────────────────────────────────────────────
export const selectRejectedBookingRequests = (state) => state.bookingRequest.bookingRequests.filter((r) => r.request_status === 'rejected');

// ─── Booking Request By ID ────────────────────────────────────────────────────
export const selectBookingRequestById = (id) => (state) => state.bookingRequest.bookingRequests.find((r) => r.id === id);

// ─── Requests By Vendor ID ────────────────────────────────────────────────────
export const selectBookingRequestsByVendor = (vendorId) => (state) =>
  state.bookingRequest.bookingRequests.filter((r) => r.vendor_id === vendorId);

// ─── Requests By Customer ID ──────────────────────────────────────────────────
export const selectBookingRequestsByCustomer = (customerId) => (state) =>
  state.bookingRequest.bookingRequests.filter((r) => r.customer_id === customerId);

// ─── Requests By Booking ID ───────────────────────────────────────────────────
export const selectBookingRequestsByBooking = (bookingId) => (state) =>
  state.bookingRequest.bookingRequests.filter((r) => r.booking_id === bookingId);
