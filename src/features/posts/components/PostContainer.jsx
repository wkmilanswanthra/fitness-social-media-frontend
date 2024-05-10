import React from "react";
import IndividualPost from "./IndividualPost";
import { useSelector } from "react-redux";

function PostContainer() {
  const { posts } = useSelector((state) => state.posts);

  return (
    <div className="w-full  px-12 pt-10  mt-14 pb-16">
      {posts?.map((post, index) => (
        <IndividualPost
          key={index}
          user={post.post.user}
          media={post.post.mediaFiles}
          type={post.post.mediaType}
          likeCount={post.post.likesCount}
          comments={post.comments}
          description={post.post.description}
          id={post.post.postID}
        />
      ))}
    </div>
  );
}

export default PostContainer;
