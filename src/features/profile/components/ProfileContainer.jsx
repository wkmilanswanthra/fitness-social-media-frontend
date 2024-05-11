import React, { useEffect } from "react";
import { Avatar, Button, Form, Input } from "antd";
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllPosstsByUserId,
  getAllStatusUpdatesByUserId,
  updateProfile,
  deleteStatusUpdate,
} from "../api/profile.api";
import IndividualPost from "../../posts/components/IndividualPost";

function ProfileContainer() {
  const user = useSelector((state) => state.auth.user);
  const { statusUpdates, posts } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllStatusUpdatesByUserId(user.id));
    dispatch(getAllPosstsByUserId(user.id));
  }, []);

  const handleEditProfile = (data) => {
    console.log("Edit Profile", data);
    dispatch(updateProfile({ ...data, id: user.id }));
    navigate(0);
  };

  return (
    <div className="w-full px-12 pt-10 mt-14 pb-16">
      <div className="flex justify-center items-center mb-8 ">
        <Avatar size={64} icon={<UserOutlined />} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-5">
        <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
        <Form
          onFinish={handleEditProfile}
          initialValues={{
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          }}
        >
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>
          <Form.Item label="First Name" name="firstName">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<EditOutlined />}>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </div>
      <UserStatusUpdates statusUpdates={statusUpdates} />
      <div className="bg-white p-4 mb-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Posts</h2>
        {posts.length === 0 && <p>No posts found</p>}
        {posts?.map((post, index) => (
          <IndividualPost
            key={index}
            user={post.post?.user}
            media={post.post?.mediaFiles}
            type={post.post?.mediaType}
            likeCount={post.post?.likesCount}
            comments={post.comments}
            description={post.post?.description}
            id={post.post?.postID}
            isProfile={true}
          />
        ))}
      </div>
    </div>
  );
}

function UserStatusUpdates({ statusUpdates }) {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handleDeleteStatusUpdate = (statusUpdateId) => {
    console.log("Delete Status Update", statusUpdateId);
    dispatch(deleteStatusUpdate(statusUpdateId));
    dispatch(getAllStatusUpdatesByUserId(user.id));
  };
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Status Updates</h2>
      {statusUpdates.length === 0 && <p>No status updates found</p>}
      {statusUpdates.map((update, index) => (
        <div
          key={index}
          className="mb-2 p-4 border rounded-lg flex justify-between"
        >
          <div>
            <p>{update.description}</p>
            <p>
              {update.metricType}: {update.metricValue}
            </p>
          </div>
          {update?.user?.id == user?.id && (
            <Button
              type="danger"
              className="mt-2"
              icon={<DeleteOutlined color="#ff0000" />}
              onClick={() => handleDeleteStatusUpdate(update.metricID)}
            ></Button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProfileContainer;
