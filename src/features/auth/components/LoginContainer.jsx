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
import { useDispatch, useSelector } from "react-redux";
import { login } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

function LoginContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    navigate("/");
  }

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(login(values)).then((res) => {
      if (res.payload.user) {
        notification.success({
          message: "Login Successful",
          description: "You have successfully logged in",
        });
      } else {
        notification.error({
          message: "Login Failed",
          description: "Please check your credentials",
        });
      }
    });
  };

  return (
    <>
      <div className="text-xl font-bold mb-4">Login</div>
      <Form
        name="loginForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          className="mb-10"
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="default" block onClick={() => navigate("/register")}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default LoginContainer;
