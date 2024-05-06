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
import { register } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

function SignUpContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(register(values)).then((res) => {
      if (res.payload.user) {
        notification.success({
          message: "Sign Up Successful",
          description: "You have successfully signed up",
        });
        navigate("/");
      } else {
        notification.error({
          message: "Sign Up Failed",
          description: "Please check your credentials",
        });
      }
    });
  };
  return (
    <>
      <div className="text-xl font-bold mb-4">Sign Up</div>
      <Form
        name="signUpForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Please input your first name" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="First Name"
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Please input your last name" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Last Name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email" },
            { type: "email", message: "Please input a valid email!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
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
            Sign Up
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="default" block onClick={() => navigate("/")}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default SignUpContainer;
