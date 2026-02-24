// ─── Base ─────────────────────────────────────────────────────────────────────
export const selectDocumentState = (state) => state.vendorDocument;

// ─── All Documents ────────────────────────────────────────────────────────────
export const selectAllDocuments = (state) => state.vendorDocument.documents;

// ─── Selected Document ────────────────────────────────────────────────────────
export const selectSelectedDocument = (state) => state.vendorDocument.selectedDocument;

// ─── Loading ──────────────────────────────────────────────────────────────────
export const selectDocumentLoading = (state) => state.vendorDocument.loading;

// ─── Error ────────────────────────────────────────────────────────────────────
export const selectDocumentError = (state) => state.vendorDocument.error;

// ─── Success ──────────────────────────────────────────────────────────────────
export const selectDocumentSuccess = (state) => state.vendorDocument.successMessage;

// ─── By Verification Status ───────────────────────────────────────────────────
export const selectPendingDocuments = (state) => state.vendorDocument.documents.filter((d) => d.verification_status === 'pending');
export const selectApprovedDocuments = (state) => state.vendorDocument.documents.filter((d) => d.verification_status === 'approved');
export const selectRejectedDocuments = (state) => state.vendorDocument.documents.filter((d) => d.verification_status === 'rejected');

// ─── By Document Type ─────────────────────────────────────────────────────────
export const selectDocumentsByType = (type) => (state) => state.vendorDocument.documents.filter((d) => d.document_type === type);

// ─── By ID ────────────────────────────────────────────────────────────────────
export const selectDocumentById = (id) => (state) => state.vendorDocument.documents.find((d) => d.id === id);
