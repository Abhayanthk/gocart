import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params = {}, thunkAPI) => {
    try {
      const { storeId, ...queryParams } = params;
      const { data } = await axios.get("/api/products", {
        params: { storeId, ...queryParams },
        withCredentials: true,
      });
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching products"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    list: [],
    pagination: {
      total: 0,
      page: 1,
      pages: 1,
    },
    facets: {
      categories: [],
    },
    loading: true,
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
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.list = action.payload.products || [];
      state.pagination = action.payload.pagination || state.pagination;
      state.facets = action.payload.facets || state.facets;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
    });
  },
});

export const { setProduct, clearProduct } = productSlice.actions;

export default productSlice.reducer;
