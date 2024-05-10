import { createAsyncThunk } from "@reduxjs/toolkit";
import makeApi from "../../../common/utils/api";

const api = makeApi();

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("posts");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("posts", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`posts/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`posts/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put(`posts/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addLike = createAsyncThunk(
  "posts/addLike",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `likes/${data.postId}/users/${data.userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeLike = createAsyncThunk(
  "posts/removeLike",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `likes/delete/${data.postId}/users/${data.userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const isLiked = createAsyncThunk(
  "posts/isLiked",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `likes/${data.postId}/users/${data.userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createStatusUpdate = createAsyncThunk(
  "posts/createStatusUpdate",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("workoutMetrics", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `comments/${data.postId}/users/${data.userId}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.delete(`comments/${data.commentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editComment = createAsyncThunk(
  "posts/editComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put(`comments/${data.commentId}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
