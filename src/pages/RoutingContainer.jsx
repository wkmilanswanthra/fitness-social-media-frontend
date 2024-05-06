import React from "react";
import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";

import Authentication from "./Authentication";
import LoginContainer from "../features/auth/components/LoginContainer";
import SignUpContainer from "../features/auth/components/SignUpContainer";

import MainContainer from "./MainContainer";
import PostContainer from "../features/posts/components/PostContainer";
import MealsContainer from "../features/meals/components/MealsContainer";
import WorkoutContainer from "../features/workouts/components/WorkoutContainer";
import ProfileContainer from "../features/profile/components/ProfileContainer";
import ProfileViewerContainer from "../features/profile/components/ProfileViewerContainer";

import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../features/auth/api/auth.api";

const authRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Authentication />,
    children: [
      { path: "", element: <LoginContainer /> },
      { path: "register", element: <SignUpContainer /> },
      { path: "*", handle: () => <div>404</div> },
    ],
  },
]);

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [
      { path: "", element: <PostContainer /> },
      { path: "meals", element: <MealsContainer /> },
      { path: "exercise", element: <WorkoutContainer /> },
      { path: "profile", element: <ProfileContainer /> },
      { path: "user/:id", element: <ProfileViewerContainer /> },
    ],
  },
]);

function RoutingContainer() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div>
      {isAuthenticated ? (
        <RouterProvider router={mainRoutes} />
      ) : (
        <RouterProvider router={authRoutes} />
      )}
    </div>
  );
}

export default RoutingContainer;
