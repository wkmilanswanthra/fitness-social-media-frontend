import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createStatusUpdate } from "../api/posts.api";

const exerciseOptions = [
  "Running",
  "Cycling",
  "Swimming",
  "Weightlifting",
  "Yoga",
  "Pilates",
  "Rowing",
  "Boxing",
  "Jumping Rope",
  "Hiking",
  "Walking",
  "Elliptical Training",
  "Rock Climbing",
  "CrossFit",
  "Barre",
  "Dancing",
  "Kickboxing",
  "Tai Chi",
  "Zumba",
  "Skiing",
  "Snowboarding",
  "Surfing",
  "Skateboarding",
  "Mountain Biking",
  "Basketball",
  "Football",
  "Soccer",
  "Tennis",
  "Golf",
  "Volleyball",
  "Badminton",
  "Table Tennis",
  "Handball",
  "Racquetball",
  "Squash",
  "Gymnastics",
  "Parkour",
  "Martial Arts",
  "Spinning",
  "High-Intensity Interval Training (HIIT)",
  "Circuit Training",
  "Bootcamp",
  "Functional Training",
  "Bodyweight Exercises",
  "Resistance Training",
  "Calisthenics",
  "Powerlifting",
  "Olympic Weightlifting",
];

const CreateStatusModal = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(
      createStatusUpdate({
        user: {
          id: user.id,
        },
        description: values.description,
        metricType: values.metricType,
        metricValue: values.metricValue,
      })
    );

    form.resetFields();
    onClose();
    message.success("Status update created successfully.");
  };

  const closeModal = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Create Status Update"
      open={open}
      onCancel={closeModal}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Metric Type"
          name="metricType"
          rules={[{ required: true, message: "Please select a metric type" }]}
        >
          <Select placeholder="Select a metric type">
            {exerciseOptions.map((option, index) => (
              <Option key={index} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Metric Value"
          name="metricValue"
          rules={[{ required: true, message: "Please enter a metric value" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Status Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateStatusModal;
