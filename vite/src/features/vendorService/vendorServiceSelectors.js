// ─── Base Selector ───────────────────────────────────────────────────────────
export const selectVendorServiceState = (state) => state.vendorServices;

// ─── All Vendor Services ──────────────────────────────────────────────────────
export const selectAllVendorServices = (state) => state.vendorService.vendorServices;

// ─── Selected Vendor Service ──────────────────────────────────────────────────
export const selectSelectedVendorService = (state) => state.vendorService.vendorServices;

// ─── Loading ──────────────────────────────────────────────────────────────────
export const selectVendorServiceLoading = (state) => state.vendorService.loading;

// ─── Error ────────────────────────────────────────────────────────────────────
export const selectVendorServiceError = (state) => state.vendorService.error;

// ─── Success Message ──────────────────────────────────────────────────────────
export const selectVendorServiceSuccess = (state) => state.vendorService.successMessage;

// ─── Active Vendor Services Only ──────────────────────────────────────────────
export const selectActiveVendorServices = (state) => state.vendorService.vendorServices.filter((vs) => vs.status === 'active');

// ─── Vendor Service By ID ─────────────────────────────────────────────────────
export const selectVendorServiceById = (id) => (state) => state.vendorService.vendorServices.find((vs) => vs.id === id);

// ─── Vendor Services by Vendor ────────────────────────────────────────────────
export const selectVendorServicesByVendor = (vendorId) => (state) =>
  state.vendorService.vendorServices.filter((vs) => vs.vendor?.id === vendorId);
