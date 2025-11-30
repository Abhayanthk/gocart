import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let debouncedTimer = null;

export const uploadCart = createAsyncThunk(
  "cart/uploadCart",
  async (_, thunkAPI) => {
    try {
      clearTimeout(debouncedTimer);
      //     suppose we add mutiple items in the cart in one second then it will only call one time
      debouncedTimer = setTimeout(async () => {
        const { cartItems } = thunkAPI.getState().cart;
        const { data } = await axios.post(
          "/api/cart",
          { cart: cartItems },
          {
            withCredentials: true,
          }
        );
      }, 1000);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/cart", { withCredentials: true });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    total: 0,
    cartItems: {},
    loading: true,
  },
  reducers: {
    addToCart: (state, action) => {
      const { productId } = action.payload;
      if (state.cartItems[productId]) {
        state.cartItems[productId]++;
      } else {
        state.cartItems[productId] = 1;
      }
      state.total += 1;
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      if (state.cartItems[productId]) {
        state.cartItems[productId]--;
        if (state.cartItems[productId] === 0) {
          delete state.cartItems[productId];
        }
      }
      state.total -= 1;
    },
    deleteItemFromCart: (state, action) => {
      // destructuring the object action.playload and takes out productId
      const { productId } = action.payload;
      state.total -= state.cartItems[productId]
        ? state.cartItems[productId]
        : 0;
      delete state.cartItems[productId];
    },
    clearCart: (state) => {
      state.cartItems = {};
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.total = Object.values(action.payload.cart).reduce(
        (total, quantity) => total + quantity,
        0
      );
      state.cartItems = action.payload.cart;
    });
    builder.addCase(fetchCart.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { addToCart, removeFromCart, clearCart, deleteItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
