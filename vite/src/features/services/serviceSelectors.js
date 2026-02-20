// ─── Base Selector ───────────────────────────────────────────────────────────
export const selectServiceState = (state) => state.service;

// ─── All Services ─────────────────────────────────────────────────────────────
export const selectAllServices = (state) => state.service.services;

// ─── Selected Service ─────────────────────────────────────────────────────────
export const selectSelectedService = (state) => state.service.selectedService;

// ─── Loading ──────────────────────────────────────────────────────────────────
export const selectServiceLoading = (state) => state.service.loading;

// ─── Error ────────────────────────────────────────────────────────────────────
export const selectServiceError = (state) => state.service.error;

// ─── Success Message ──────────────────────────────────────────────────────────
export const selectServiceSuccess = (state) => state.service.successMessage;

// ─── Active Services Only ─────────────────────────────────────────────────────
export const selectActiveServices = (state) => state.service.services.filter((s) => s.is_active);

// ─── Service By ID ────────────────────────────────────────────────────────────
export const selectServiceById = (id) => (state) => state.service.services.find((s) => s.id === id);

// ─── Services by Category ─────────────────────────────────────────────────────
export const selectServicesByCategory = (categoryId) => (state) => state.service.services.filter((s) => s.category?.id === categoryId);
