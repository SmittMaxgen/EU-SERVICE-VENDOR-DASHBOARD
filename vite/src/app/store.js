import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from '../features/services/serviceSlice';
import vendorServiceReducer from '../features/vendorService/vendorServiceSlice';
import authReducer from '../features/auth/authSlice';
import vendorReducer from '../features/vendorProfile/vendorProfileSlice';
import documentReducer from '../features/vendorDocument/vendorDocumentSlice';

const Store = configureStore({
  reducer: {
    service: serviceReducer,
    vendorService: vendorServiceReducer,
    auth: authReducer,
    vendor: vendorReducer,
    vendorDocument: documentReducer
  }
});

export default Store;
