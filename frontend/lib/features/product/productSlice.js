import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ storeId }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        "/api/products" + (storeId ? `?storeId=${storeId}` : ""),
        { storeId },
        {
          withCredentials: true,
        }
      );
      return data.products;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    list: [],
  },
  reducers: {
    setProduct: (state, action) => {
      state.list = action.payload;
    },
    clearProduct: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const { setProduct, clearProduct } = productSlice.actions;

export default productSlice.reducer;
