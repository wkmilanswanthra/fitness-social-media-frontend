import React, { useEffect } from "react";
import { Avatar, Button, Form, Input } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPosstsByUserId,
  getAllStatusUpdatesByUserId,
} from "../api/profile.api";
import IndividualPost from "../../posts/components/IndividualPost";

function ProfileContainer() {
  const user = useSelector((state) => state.auth.user);
  const { statusUpdates, posts } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStatusUpdatesByUserId(user.id));
    dispatch(getAllPosstsByUserId(user.id));
  }, []);

  const handleEditProfile = () => {};

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
          />
        ))}
      </div>
    </div>
  );
}

function UserStatusUpdates({ statusUpdates }) {
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Status Updates</h2>
      {statusUpdates.length === 0 && <p>No status updates found</p>}
      {statusUpdates.map((update, index) => (
        <div key={index} className="mb-2 p-4 border rounded-lg">
          <p>{update.description}</p>
          <p>
            {update.metricType}: {update.metricValue}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProfileContainer;
