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
    const mediaType = fileList.some((file) => file.type.includes("image"))
      ? "images"
      : "video";
    dispatch(
      createPost({
        ...values,
        mediaFiles: fileList,
        mediaType,
        user_id: user.id,
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
          <Upload
            fileList={fileList}
            onChange={(info) => {
              if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
              }
              console.log(info);
              if (info.file.status === "done") {
                console.log(info.file);
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
              }
            }}
            action={"http://localhost:8081/api/v1/posts/upload"}
            maxCount={3}
            accept="image/*,video/*"
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
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
