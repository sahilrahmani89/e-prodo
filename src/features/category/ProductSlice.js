import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { productCategory } from '../../api';

const initialState = {
    data: null,
    isLoading: false,
    error: null,
    filterObject:[]
  };


export const fetchProduct = createAsyncThunk('category/fetchProduct', async (id) => {

    try {
      // Perform API call to fetch data
      const response = await axios.get(`${productCategory}${id}`);
      const data = await response.data;
      // Return fetched data as result
    //   console.log('data',data)
      //
      return data;
    } catch (error) {
      // Throw error for error handling
      throw new Error('Something Wrong, failed to fetch');
    }
  });
  export const fetchProductPage = createAsyncThunk('category/fetchProductPage', async (api) => {
   
    try {
      // Perform API call to fetch data
      const response = await axios.get(`${api}`);
      const data = await response.data;
      // Return fetched data as result

      //
      return data;
    } catch (error) {
      // Throw error for error handling
      throw new Error('Something Wrong, failed to fetch');
    }
  });

  export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      sortReducer:(state,action)=>{
        if(action.payload==='sortbyalpha'){
         
           state.filterObject.items = state.data.items.sort((a,b)=>{
              const nameA = a.productName.toUpperCase();
              const nameB = b.productName.toUpperCase();
                if (nameA < nameB) {
                  return -1; // a should be sorted before b
                }
                if (nameA > nameB) {
                  return 1; // a should be sorted after b
                }
                return 0; 
            })
        }
        else{
          state.filterObject.items =  state.data.items.sort((a,b)=>{
          //sort by date wont show any changes as date is same
              const dateA = new Date(a.date); // Convert dates to Date objects
              const dateB = new Date(b.date);

              return dateA - dateB; // Compare dates and return the result
            })
        }
      },
      filterLess:(state)=>{
        state.filterObject.items = state.data.items.filter((prevDate)=>{
          return  prevDate.variants.some((price)=>price.price<10)
        })
        
      },
      filterGreater:(state)=>{
        state.filterObject.items = state.data.items.filter((prevDate)=>{
          return  prevDate.variants.some((price)=>price.price>10)
        })
        
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProduct.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchProduct.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
          state.filterObject = action.payload
        })
        .addCase(fetchProduct.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        })
        .addCase(fetchProductPage.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchProductPage.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
          state.filterObject = action.payload
        })
        .addCase(fetchProductPage.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
    }
  });
export const { sortReducer,filterLess,filterGreater} = productSlice.actions;
export default productSlice.reducer;
