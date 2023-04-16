import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { categroryApi } from '../../api';

const initialState = {
    data: null,
    isLoading: false,
    error: null
  };


export const fetchCategory = createAsyncThunk('category/fetchCategory', async () => {
    try {
      // Perform API call to fetch data
      const response = await axios.get(categroryApi);
      const data = await response.data;
      // Return fetched data as result
      return data;
    } catch (error) {
      // Throw error for error handling
      throw new Error('Something Wrong, failed to fetch');
    }
  });

  export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCategory.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchCategory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        })
        .addCase(fetchCategory.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
    }
  });

export default categorySlice.reducer;
