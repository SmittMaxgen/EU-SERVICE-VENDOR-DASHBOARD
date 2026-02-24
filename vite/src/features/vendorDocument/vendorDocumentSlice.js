import { createSlice } from '@reduxjs/toolkit';
import {
  fetchVendorDocuments,
  fetchVendorDocumentById,
  createVendorDocument,
  updateVendorDocument,
  deleteVendorDocument
} from './vendorDocumentThunk';

const initialState = {
  documents: [],
  selectedDocument: null,
  loading: false,
  error: null,
  successMessage: null
};

const vendorDocumentSlice = createSlice({
  name: 'vendorDocument',
  initialState,
  reducers: {
    setSelectedDocument(state, action) {
      state.selectedDocument = action.payload;
    },
    clearSelectedDocument(state) {
      state.selectedDocument = null;
    },
    clearDocumentMessages(state) {
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    // ─── Fetch All ────────────────────────────────────────────────────────────
    builder
      .addCase(fetchVendorDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(fetchVendorDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Fetch By ID ──────────────────────────────────────────────────────────
    builder
      .addCase(fetchVendorDocumentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorDocumentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDocument = action.payload;
      })
      .addCase(fetchVendorDocumentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Create ───────────────────────────────────────────────────────────────
    builder
      .addCase(createVendorDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVendorDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documents.push(action.payload);
        state.successMessage = 'Document uploaded successfully!';
      })
      .addCase(createVendorDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Update ───────────────────────────────────────────────────────────────
    builder
      .addCase(updateVendorDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVendorDocument.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.documents.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) state.documents[index] = action.payload;
        state.selectedDocument = action.payload;
        state.successMessage = 'Document updated successfully!';
      })
      .addCase(updateVendorDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ─── Delete ───────────────────────────────────────────────────────────────
    builder
      .addCase(deleteVendorDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVendorDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = state.documents.filter((d) => d.id !== action.payload);
        state.successMessage = 'Document deleted successfully!';
      })
      .addCase(deleteVendorDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSelectedDocument, clearSelectedDocument, clearDocumentMessages } = vendorDocumentSlice.actions;

export default vendorDocumentSlice.reducer;
