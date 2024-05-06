import React, { useEffect } from "react";
import { Avatar, Carousel } from "antd";
import { HeartOutlined, UserOutlined, HeartFilled } from "@ant-design/icons";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { addLike, removeLike, isLiked } from "../api/posts.api";
import { useNavigate } from "react-router-dom";

function IndividualPost({
  user,
  media,
  likeCount,
  comments,
  description,
  type,
  id,
}) {
  const [liked, setLiked] = React.useState(false);
  const curUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(isLiked({ postId: id, userId: curUser.id })).then((res) => {
      if (res.error) {
        setLiked(false);
      } else {
        setLiked(true);
      }
    });
  }, []);

  const handleLike = (id) => {
    console.log(id, curUser.id, liked);
    if (liked) {
      dispatch(removeLike({ postId: id, userId: curUser.id })).then((res) => {
        if (res.error) {
          return;
        }
        setLiked(false);
      });
    } else {
      dispatch(addLike({ postId: id, userId: curUser.id })).then((res) => {
        if (res.error) {
          return;
        }
        setLiked(true);
      });
    }
  };

  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow">
      <div className="flex items-center mb-2">
        <Avatar icon={<UserOutlined />} />
        <span
          className="font-semibold ml-4 cursor-pointer"
          onClick={() => navigate(`user/${user.id}`)}
        >
          {user?.firstName}
        </span>
      </div>

      <div className="mb-2">
        {type === "images" ? (
          media.length === 1 ? (
            <img src={media[0]} alt="Post Media" className="w-full" />
          ) : (
            <div style={{ maxWidth: "640px", maxHeight: "400px" }}>
              <Carousel autoplay style={{ overflow: "hidden" }}>
                {media?.map((url, index) => (
                  <div key={index}>
                    <img
                      src={url}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover"
                      style={{ maxHeight: "400px", height: "400px" }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )
        ) : (
          <ReactPlayer
            muted={true}
            url={media?.url}
            controls
            width="640px"
            height="400px"
          />
        )}
      </div>

      <div className="flex items-center mb-2">
        <button className="mr-2" onClick={() => handleLike(id)}>
          {liked ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
        </button>
        <span>{likeCount}</span>
      </div>
      <div className="flex items-center mb-4">
        <span className="font-semibold mr-2">{user?.username}</span>
        {description}
      </div>

      <div>
        {comments?.map((comment, index) => (
          <div key={index} className="mb-2">
            <span className="font-semibold">{comment.user.firstName}</span>{" "}
            {comment.content}
          </div>
        ))}
      </div>

      <div className="flex w-full mt-4">
        <input
          type="text"
          placeholder="Add a comment"
          className="w-full border rounded p-2 mr-8"
        />
        <button className="bg-transparent text-slate-500 p-2 rounded">
          Post
        </button>
      </div>
    </div>
  );
}

export default IndividualPost;
