import { configureStore } from '@reduxjs/toolkit';
import  categoryReducer from '../features/category/CategorySlice'
import productReducer from '../features/category/ProductSlice'
import productDetailsReducer from '../features/category/ProductDetailSlice';

export const store = configureStore({
  reducer: {
    category:categoryReducer,
    product:productReducer,
    productDetails:productDetailsReducer
  },
});
