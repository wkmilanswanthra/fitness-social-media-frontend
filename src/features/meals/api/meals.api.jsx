import { createAsyncThunk } from "@reduxjs/toolkit";
import makeApi from "../../../common/utils/api";

export const createMeal = createAsyncThunk(
  "meals/createMeal",
  async (data, { rejectWithValue }) => {
    try {
      const api = makeApi();
      const response = await api.post("/mealPlans", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
