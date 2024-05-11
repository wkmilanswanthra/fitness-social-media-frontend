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

export const getMeals = createAsyncThunk(
  "meals/getMeals",
  async (_, { rejectWithValue }) => {
    try {
      const api = makeApi();
      const response = await api.get("/mealPlans");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateMeal = createAsyncThunk(
  "meals/updateMeal",
  async (data, { rejectWithValue }) => {
    try {
      const api = makeApi();
      const response = await api.patch(`/mealPlans/${data.mealID}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteMeal = createAsyncThunk(
  "meals/deleteMeal",
  async (mealId, { rejectWithValue }) => {
    try {
      const api = makeApi();
      const response = await api.delete(`/mealPlans/${mealId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
