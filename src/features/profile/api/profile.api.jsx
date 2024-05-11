import { createAsyncThunk } from "@reduxjs/toolkit";
import makeApi from "../../../common/utils/api";

const api = makeApi();

export const getUser = createAsyncThunk(
  "profile/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllPosstsByUserId = createAsyncThunk(
  "posts/getAllPostsByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`posts/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllStatusUpdatesByUserId = createAsyncThunk(
  "posts/getAllStatusUpdatesByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`workoutMetrics/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.patch(`user/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
