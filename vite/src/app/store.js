import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from '../features/services/serviceSlice';
import vendorServiceReducer from '../features/vendorService/vendorServiceSlice';

const Store = configureStore({
  reducer: {
    service: serviceReducer,
    vendorService: vendorServiceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default Store;
