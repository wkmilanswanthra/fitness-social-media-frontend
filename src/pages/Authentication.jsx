import React from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Image,
  Divider,
  notification,
} from "antd";
import { UserOutlined, LockOutlined, GithubOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/api/auth.api";
import { Outlet, useNavigate } from "react-router-dom";

function Authentication() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(login(values));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg h-min-[50%] w-[50%]">
        <Row gutter={16} className="h-full">
          <Col span={12} className="h-full overflow-clip">
            <Image
              src="https://i.pinimg.com/736x/22/f3/98/22f3980104ac3af2153ef3fa688b5579.jpg"
              alt="Login Image"
              className="w-auto h-full  rounded-xl"
              preview={false}
            />
          </Col>
          <Col span={2} className="flex items-center justify-center">
            <div className="h-[80%] border-r border-gray-100"></div>
          </Col>
          <Col span={10} className="flex flex-col justify-center">
            <div className="text-xl font-bold mb-10 text-center flex flex-row self-center items-center">
              <Image
                preview={false}
                src="https://cdn.iconscout.com/icon/free/png-256/free-google-fitness-2981838-2476490.png"
                style={{ width: "50px" }}
              />
              <div className="text-xl font-bold ml-4 text-center">
                Train Together
              </div>
            </div>
            <Outlet />
            <Divider />
            <div className="text-center">
              <Button
                type="default"
                icon={<GithubOutlined />}
                block
                href="http://localhost:8081/api/v1/oauth2/authorization/github"
              >
                Login with GitHub
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Authentication;
