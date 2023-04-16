import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { singleProduct } from '../../api';

const initialState = {
    data: null,
    isLoading: false,
    error: null
  };


export const fetchProductDetails = createAsyncThunk('category/productDetails', async (id) => {

    try {
      // Perform API call to fetch data
      const response = await axios.get(`${singleProduct}${id}`);
      const data = await response.data;
      // Return fetched data as result
      //
      return data;
    } catch (error) {
      // Throw error for error handling
      throw new Error('Something Wrong, failed to fetch');
    }
  });

  export const productDetailSlice = createSlice({
    name: 'productDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProductDetails.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchProductDetails.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        })
        .addCase(fetchProductDetails.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
    }
  });

export default productDetailSlice.reducer;
