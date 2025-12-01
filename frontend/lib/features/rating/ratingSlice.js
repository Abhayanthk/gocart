import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchUserRatings = createAsyncThunk(
  "rating/fetchUserRatings",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/rating", {
        withCredentials: true,
      });
      return data ? data.ratings : [];
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    ratings: [],
  },
  reducers: {
    addRating: (state, action) => {
      state.ratings.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserRatings.fulfilled, (state, action) => {
      state.ratings = action.payload;
    });
  },
});
export const { addRating } = ratingSlice.actions;
export default ratingSlice.reducer;
