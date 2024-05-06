import { createAsyncThunk } from "@reduxjs/toolkit";

import makeApi from "../../../common/utils/api";

const api = makeApi();

export const getAllWorkouts = createAsyncThunk(
  "workouts/getAllWorkouts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("workoutPlans");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createWorkout = createAsyncThunk(
  "workouts/createWorkout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("workoutPlans", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getWorkoutById = createAsyncThunk(
  "workouts/getWorkoutById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`workoutPlans/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteWorkout = createAsyncThunk(
  "workouts/deleteWorkout",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`workoutPlans/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateWorkout = createAsyncThunk(
  "workouts/updateWorkout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put(`workoutPlans/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
