import { createSlice } from "@reduxjs/toolkit";
import { createMeal, getMeals } from "../api/meals.api";

const initialState = {
  meals: [],
  loading: false,
  error: null,
};

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getMeals.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = action.payload;
      })
      .addCase(getMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mealsSlice.reducer;
