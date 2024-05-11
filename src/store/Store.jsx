import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/store/auth.slice";
import postsReducer from "../features/posts/store/posts.slice";
import workoutsReducer from "../features/workouts/store/workouts.slice";
import profileReducer from "../features/profile/store/profile.slice";
import mealsReducer from "../features/meals/store/meals.slice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    workouts: workoutsReducer,
    profile: profileReducer,
    meals: mealsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});
