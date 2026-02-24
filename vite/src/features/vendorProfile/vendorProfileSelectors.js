// ─── Base ─────────────────────────────────────────────────────────────────────
export const selectVendorState = (state) => state.vendor;

// ─── All Vendors ──────────────────────────────────────────────────────────────
export const selectAllVendors = (state) => state.vendor.vendors;

// ─── Selected Vendor ──────────────────────────────────────────────────────────
export const selectSelectedVendor = (state) => state.vendor.selectedVendor;

// ─── Loading ──────────────────────────────────────────────────────────────────
export const selectVendorLoading = (state) => state.vendor.loading;

// ─── Error ────────────────────────────────────────────────────────────────────
export const selectVendorError = (state) => state.vendor.error;

// ─── Success ──────────────────────────────────────────────────────────────────
export const selectVendorSuccess = (state) => state.vendor.successMessage;

// ─── By Status ────────────────────────────────────────────────────────────────
export const selectApprovedVendors = (state) => state.vendor.vendors.filter((v) => v.status === 'approved');
export const selectPendingVendors = (state) => state.vendor.vendors.filter((v) => v.status === 'pending');
export const selectRejectedVendors = (state) => state.vendor.vendors.filter((v) => v.status === 'rejected');
export const selectSuspendedVendors = (state) => state.vendor.vendors.filter((v) => v.status === 'suspended');

// ─── By ID ────────────────────────────────────────────────────────────────────
export const selectVendorById = (id) => (state) => state.vendor.vendors.find((v) => v.id === id);
