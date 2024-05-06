import React, { useEffect } from "react";
import { Avatar, Button } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  getAllPosstsByUserId,
  getAllStatusUpdatesByUserId,
} from "../api/profile.api";
import { useParams } from "react-router-dom";
import IndividualPost from "../../posts/components/IndividualPost";

function ProfileViewerContainer() {
  const { user, statusUpdates, posts } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getAllPosstsByUserId(id));
    dispatch(getAllStatusUpdatesByUserId(id));
  }, []);
  return (
    <div className="w-full px-12 mt-14 pt-10 pb-16">
      <div className="flex flex-col justify-center items-center mb-8 ">
        <Avatar size={64} icon={<UserOutlined />} />
        <span className="font-semibold">{user?.user?.username}</span>
      </div>
      <div className="bg-white p-6 rounded-lg">
        <div className="mb-2">
          <label className="font-semibold">First Name:</label>
          <span className="ml-2">{user?.user?.firstName}</span>
        </div>
        <div className="mb-2">
          <label className="font-semibold">Last Name:</label>
          <span className="ml-2">{user?.user?.lastName}</span>
        </div>
        <div className="mb-2">
          <label className="font-semibold">Email:</label>
          <span className="ml-2">{user?.user?.email}</span>
        </div>
      </div>
      <UserStatusUpdates statusUpdates={statusUpdates} />
      <div className="bg-white p-4 mb-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Posts</h2>
        {posts?.map((post, index) => (
          <IndividualPost
            key={index}
            user={post?.post?.user}
            media={post?.post?.mediaFiles}
            type={post?.post?.mediaType}
            likeCount={post?.post?.likesCount}
            comments={post?.post?.comments}
            description={post?.post?.description}
            id={post?.post?.postID}
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

export default ProfileViewerContainer;
