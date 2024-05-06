import { createSlice } from "@reduxjs/toolkit";
import {
  getAllWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
  getWorkoutById,
} from "../api/workouts.api";

const initialState = {
  workouts: [],
  workout: null,
  loading: false,
  error: null,
};

const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllWorkouts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllWorkouts.fulfilled, (state, action) => {
        state.workouts = action.payload;
        state.loading = false;
      })
      .addCase(getAllWorkouts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createWorkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.workouts.push(action.payload);
        state.loading = false;
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteWorkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.workouts = state.workouts.filter(
          (workout) => workout.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateWorkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWorkout.fulfilled, (state, action) => {
        state.workouts = state.workouts.map((workout) =>
          workout.id === action.payload.id ? action.payload : workout
        );
        state.loading = false;
      })
      .addCase(updateWorkout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getWorkoutById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWorkoutById.fulfilled, (state, action) => {
        state.workout = action.payload;
        state.loading = false;
      })
      .addCase(getWorkoutById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default workoutsSlice.reducer;
