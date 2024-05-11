import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Upload, message, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateMeal } from "../api/meals.api";

const { Option } = Select;

const UpdateMealPlanModal = ({
  open,
  setOpen,
  mealID,
  mealName,
  description,
  ingredients,
  cookingInstructions,
  photos,
  dietaryPreferences,
}) => {
  const [form] = Form.useForm();

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue({
      mealName,
      description,
      ingredients,
      cookingInstructions,
      photos,
      dietaryPreferences,
    });
  }, [
    mealName,
    description,
    ingredients,
    cookingInstructions,
    photos,
    dietaryPreferences,
  ]);

  const onFinish = async (values) => {
    const data = {
      user: {
        id: user.id,
      },
      mealID,
      mealName: values.mealName,
      description: values.description,
      ingredients: values.ingredients,
      cookingInstructions: values.cookingInstructions,
      dietaryPreferences: values.dietaryPreferences,
    };
    console.log("Meal Plan:", data);
    try {
      dispatch(updateMeal(data));
      handleClose();
      message.success("Meal plan created successfully!");
    } catch (error) {
      message.error("Failed to create meal plan. Please try again.");
    }
  };

  const handleClose = () => {
    form.resetFields();
    setOpen(false);
  };

  return (
    <Modal
      title="Create Meal Plan"
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Meal Name"
          name="mealName"
          rules={[{ required: true, message: "Please enter a meal name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Ingredients" name="ingredients">
          <Select mode="tags" placeholder="Enter ingredients"></Select>
        </Form.Item>
        <Form.Item label="Cooking Instructions" name="cookingInstructions">
          <Input.TextArea />
        </Form.Item>
        {/* <Form.Item label="Photos" name="photos">
          <Upload
            listType="picture-card"
            action="/upload"
            showUploadList={false}
          >
            <Button icon={<PlusOutlined />} />
          </Upload>
        </Form.Item> */}
        <Form.Item label="Dietary Preferences" name="dietaryPreferences">
          <Select mode="multiple" placeholder="Select dietary preferences">
            <Option value="Vegetarian">Vegetarian</Option>
            <Option value="Gluten-Free">Gluten-Free</Option>
            <Option value="Vegan">Vegan</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Update Meal Plan
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateMealPlanModal;
