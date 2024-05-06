import React from "react";
import IndividualPost from "./IndividualPost";
import { useSelector } from "react-redux";

// const posts = [
//   {
//     user: {
//       name: "John Doe",
//       profilePic: "https://example.com/profile-pic-1.jpg",
//     },
//     description: "Just completed my morning workout! Feeling great 💪",
//     media: {
//       type: "image",
//       url: [
//         "https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-an-old-gym-setting-with-dumbbells-image_2569910.jpg",
//         "https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-an-old-gym-setting-with-dumbbells-image_2569910.jpg",
//       ],
//     },
//     likeCount: 15,
//     comments: [
//       { user: "Alice", text: "Great post!" },
//       { user: "Bob", text: "Keep it up!" },
//     ],
//   },
//   {
//     user: {
//       name: "John Doe",
//       profilePic: "https://example.com/profile-pic-1.jpg",
//     },
//     description: "Just completed my morning workout! Feeling great 💪",
//     media: {
//       type: "image",
//       url: [
//         "https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-an-old-gym-setting-with-dumbbells-image_2569910.jpg",
//       ],
//     },
//     likeCount: 15,
//     comments: [
//       { user: "Alice", text: "Great post!" },
//       { user: "Bob", text: "Keep it up!" },
//     ],
//   },
//   {
//     user: {
//       name: "Jane Smith",
//       profilePic: "https://example.com/profile-pic-2.jpg",
//     },
//     description: "Just completed my morning workout! Feeling great 💪",
//     media: {
//       type: "video",
//       url: "https://videos.pexels.com/video-files/855828/855828-hd_1920_1080_30fps.mp4",
//     },
//     likeCount: 20,
//     comments: [
//       { user: "Charlie", text: "Awesome!" },
//       { user: "David", text: "Love it!" },
//     ],
//   },
//   {
//     user: {
//       name: "Jane Smith",
//       profilePic: "https://example.com/profile-pic-2.jpg",
//     },
//     description: "Just completed my morning workout! Feeling great 💪",
//     media: {
//       type: "video",
//       url: "https://videos.pexels.com/video-files/855828/855828-hd_1920_1080_30fps.mp4",
//     },
//     likeCount: 20,
//     comments: [
//       { user: "Charlie", text: "Awesome!" },
//       { user: "David", text: "Love it!" },
//     ],
//   },
// ];

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
