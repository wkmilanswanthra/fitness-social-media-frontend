import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RoutingContainer from "./pages/RoutingContainer";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/auth/api/auth.api";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(loadUser());
    }
  }, []);
  return (
    <>
      <RoutingContainer />
    </>
  );
}

export default App;
