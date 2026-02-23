// ─── Base ─────────────────────────────────────────────────────────────────────
export const selectAuthState = (state) => state.auth;

// ─── Vendor / User ────────────────────────────────────────────────────────────
export const selectCurrentVendor = (state) => state.auth.vendor;

// ─── Token ────────────────────────────────────────────────────────────────────
export const selectAuthToken = (state) => state.auth.token;

// ─── Is Authenticated ─────────────────────────────────────────────────────────
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// ─── Loading ──────────────────────────────────────────────────────────────────
export const selectAuthLoading = (state) => state.auth.loading;

// ─── Error ────────────────────────────────────────────────────────────────────
export const selectAuthError = (state) => state.auth.error;

// ─── Success ──────────────────────────────────────────────────────────────────
export const selectAuthSuccess = (state) => state.auth.successMessage;
