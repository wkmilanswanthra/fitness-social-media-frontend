import { createSlice } from "@reduxjs/toolkit";
import {
  getAllPosstsByUserId,
  getAllStatusUpdatesByUserId,
  getUser,
} from "../api/profile.api";

const initialState = {
  user: null,
  posts: [],
  statusUpdates: [],
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getAllPosstsByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosstsByUserId.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(getAllPosstsByUserId.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getAllStatusUpdatesByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStatusUpdatesByUserId.fulfilled, (state, action) => {
        state.statusUpdates = action.payload;
        state.loading = false;
      })
      .addCase(getAllStatusUpdatesByUserId.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default profileSlice.reducer;
