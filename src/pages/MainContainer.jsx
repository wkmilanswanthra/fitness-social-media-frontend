import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  AppleOutlined,
  PlayCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Navbar from "../common/components/Navbar";
import Sidebar from "../common/components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../features/posts/api/posts.api";

function MainContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-auto main" style={{}}>
      <Navbar />
      <Sidebar />
      <div className="flex-grow bg-gray-100 flex flex-col justify-between">
        <div className="bg-white mx-auto min-w-[40%] h-full shadow-lg flex flex-col">
          <div className="flex-grow ">
            <Outlet />
          </div>
          <Menu
            mode="horizontal"
            className="z-100 text-lg text-white fixed bottom-0 min-w-[40%] align-bottom flex self-center justify-between  bg-gray-800 shadow-xl rounded-t-xl shadow-slate-300"
            disabledOverflow
          >
            <Menu.Item
              style={{
                paddingTop: "20px",
                paddingBottom: "20px",
                color: "#FFF",
              }}
              key="home"
              onClick={() => navigate("/")}
              icon={<HomeOutlined style={{ fontSize: "110%" }} />}
            >
              Home
            </Menu.Item>
            <Menu.Item
              style={{
                paddingTop: "20px",
                paddingBottom: "20px",
                color: "#FFF",
              }}
              key="meals"
              onClick={() => navigate("/meals")}
              icon={<AppleOutlined style={{ fontSize: "110%" }} />}
            >
              Meals
            </Menu.Item>
            <Menu.Item
              style={{
                paddingTop: "20px",
                paddingBottom: "20px",
                color: "#FFF",
              }}
              key="exercise"
              onClick={() => navigate("/exercise")}
              icon={<PlayCircleOutlined style={{ fontSize: "110%" }} />}
            >
              Exercise
            </Menu.Item>
            <Menu.Item
              style={{
                paddingTop: "20px",
                paddingBottom: "20px",
                color: "#FFF",
              }}
              key="profile"
              onClick={() => navigate("/profile")}
              icon={<UserOutlined style={{ fontSize: "110%" }} />}
            >
              Profile
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
