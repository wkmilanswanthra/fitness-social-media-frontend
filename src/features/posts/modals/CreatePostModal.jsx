import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../api/posts.api";

const CreatePostModal = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("Form values:", values);
    console.log("File List:", fileList);
    let mediaType = "images";
    if (fileList.some((file) => file.type.includes("video"))) {
      mediaType = "video";
    }
    if (fileList.length === 0) {
      message.error("Please upload media files.");
      return;
    } else if (fileList.length > 3) {
      form.setFields([
        { name: "mediaFiles", errors: ["You can only upload up to 3 images."] },
      ]);
      return;
    }

    dispatch(
      createPost({
        ...values,
        mediaFiles: [
          "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://plus.unsplash.com/premium_photo-1670505062582-fdaa83c23c9e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        mediaType,
        user: {
          id: user?.id,
        },
      })
    );
    onClose();
  };

  const onFileChange = ({ fileList }) => {
    if (fileList.length > 3) {
      fileList = fileList.slice(0, 3);
      message.warning("You can only upload up to 3 images.");
    }
    setFileList(fileList);
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <Modal title="Create Post" open={open} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea rows={1} />
        </Form.Item>
        <Form.Item
          label="Media Files"
          name="mediaFiles"
          rules={[{ required: true, message: "Please upload media files" }]}
        >
          <Upload {...props} maxCount={3} multiple listType="picture">
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Post
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePostModal;
