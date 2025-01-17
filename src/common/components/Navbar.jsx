import React, { useEffect } from "react";
import { Menu, Dropdown, Button, Avatar, Image, Space, Tag } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/api/auth.api";
import { useNavigate } from "react-router-dom";
import { getNotifications } from "../../features/posts/api/posts.api";
import NotificationsModal from "./NotificationsModal";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { notifications } = useSelector((state) => state.posts);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    dispatch(getNotifications(user.id));
  }, []);

  const handleLogout = () => {
    console.log("Logout");
    navigate("/");
    dispatch(logout()).then(() => {});
  };

  const items = [
    {
      key: "2",
      label: (
        <button onClick={handleLogout} target="_blank">
          Logout
        </button>
      ),
    },
  ];

  return (
    <div className="flex justify-between items-center bg-gray-800 py-4 px-6 text-white absolute w-full z-50">
      <div className="flex items-center">
        <Image
          preview={false}
          src="https://cdn.iconscout.com/icon/free/png-256/free-google-fitness-2981838-2476490.png"
          style={{ width: "25px", marginRight: "10px" }}
        />
        <span className="text-xl font-bold">Train Together</span>
      </div>

      <div>
        <Button
          type="Link"
          className="text-lg font-semibold text-white mr-10 align-middle"
          onClick={() => setVisible(true)}
        >
          Notifications{" "}
          <Tag color="cyan" className="ml-4">
            {notifications.length}
          </Tag>
        </Button>

        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar icon={<UserOutlined />} />
              <span className="text-lg font-semibold">
                {user?.firstName} {user?.lastName}
              </span>
              <DownOutlined style={{ fontSize: "80%" }} />
            </Space>
          </a>
        </Dropdown>
      </div>
      <NotificationsModal visible={visible} setVisible={setVisible} />
    </div>
  );
}

export default Navbar;
