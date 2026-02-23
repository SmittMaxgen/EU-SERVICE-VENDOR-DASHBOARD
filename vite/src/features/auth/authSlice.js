import { createSlice } from '@reduxjs/toolkit';
import { loginVendor, registerVendor, logoutVendor } from './authThunk';

const initialState = {
  vendor: null,
  token: localStorage.getItem('token') || null, // ← hydrate from storage on refresh
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
  successMessage: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
    // call this if token expires / 401 interceptor fires
    forceLogout(state) {
      state.vendor = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    // ─── Login ───────────────────────────────────────────────────────────────
    builder
      .addCase(loginVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor = action.payload.vendor ?? action.payload.user ?? null;
        state.token = action.payload.token ?? action.payload.access ?? null;
        state.isAuthenticated = true;
        state.successMessage = 'Logged in successfully!';
      })
      .addCase(loginVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Register ─────────────────────────────────────────────────────────────
    builder
      .addCase(registerVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor = action.payload.vendor ?? action.payload.user ?? null;
        state.token = action.payload.token ?? action.payload.access ?? null;
        state.isAuthenticated = true;
        state.successMessage = 'Registered successfully!';
      })
      .addCase(registerVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Logout ───────────────────────────────────────────────────────────────
    builder.addCase(logoutVendor.fulfilled, (state) => {
      state.vendor = null;
      state.token = null;
      state.isAuthenticated = false;
      state.successMessage = 'Logged out successfully!';
    });
  }
});

export const { clearAuthMessages, forceLogout } = authSlice.actions;
export default authSlice.reducer;
