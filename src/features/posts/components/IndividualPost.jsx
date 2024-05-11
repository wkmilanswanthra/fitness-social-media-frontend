import React, { useEffect } from "react";
import { Avatar, Carousel, Button, notification, Input } from "antd";
import {
  HeartOutlined,
  UserOutlined,
  HeartFilled,
  DeleteTwoTone,
  EditOutlined,
} from "@ant-design/icons";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import {
  addLike,
  removeLike,
  isLiked,
  addComment,
  deleteComment,
  editComment,
  getAllPosts,
  deletePost,
  updatePost,
} from "../api/posts.api";
import { useNavigate } from "react-router-dom";

function IndividualPost({
  user,
  media,
  likeCount,
  comments,
  description,
  type,
  id,
  isProfile,
}) {
  const [liked, setLiked] = React.useState(false);
  const curUser = useSelector((state) => state.auth.user);
  const [comment, setComment] = React.useState("");
  const [editedComment, setEditedComment] = React.useState("");
  const [isEditingPost, setIsEditingPost] = React.useState(false);
  const [newDescription, setNewDescription] = React.useState(description);
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
        dispatch(getAllPosts());
      });
    } else {
      dispatch(addLike({ postId: id, userId: curUser.id })).then((res) => {
        if (res.error) {
          return;
        }
        setLiked(true);
        dispatch(getAllPosts());
      });
    }
  };

  const addcomment = () => {
    console.log("comment", comment);
    if (editedComment) {
      dispatch(
        editComment({ commentId: editedComment, content: comment })
      ).then((res) => {
        if (res.error) {
          notification.error({
            message: "Error",
            description: "Failed to add comment",
          });
        }
        setComment("");
        setEditedComment("");
        dispatch(getAllPosts());
      });
      return;
    }
    dispatch(
      addComment({ postId: id, userId: curUser.id, content: comment })
    ).then((res) => {
      if (res.error) {
        notification.error({
          message: "Error",
          description: "Failed to add comment",
        });
      }
      setComment("");
      dispatch(getAllPosts());
    });
  };

  const handleDeleteComment = (commentId) => {
    console.log("commentId", commentId);
    dispatch(deleteComment({ commentId })).then((res) => {
      if (res.error) {
        notification.error({
          message: "Error",
          description: "Failed to delete comment",
        });
      }
      dispatch(getAllPosts());
    });
  };

  const handleDeletePost = (postId) => {
    console.log("postId", postId);
    dispatch(deletePost(postId)).then((res) => {
      if (res.error) {
        notification.error({
          message: "Error",
          description: "Failed to delete post",
        });
      }
      dispatch(getAllPosts());
      navigate(0);
    });
  };

  const handleEditComment = (commentId, comment) => {
    console.log("commentId", commentId);
    setEditedComment(commentId);
    setComment(comment);
  };

  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow">
      <div className="flex items-center mb-2 justify-between">
        <div>
          <Avatar icon={<UserOutlined />} />
          <span
            className="font-semibold ml-4 cursor-pointer"
            onClick={() => navigate(`user/${user.id}`)}
          >
            {user?.firstName}
          </span>
        </div>
        {isProfile && curUser.id == user.id && (
          <DeleteTwoTone
            twoToneColor={"#ff0000"}
            className="ml-4 cursor-pointer"
            onClick={() => handleDeletePost(id)}
          />
        )}
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
      <div className="flex items-center mb-4 justify-between">
        <div>
          <span className="font-semibold mr-2">{user?.firstName}</span>
          {!isEditingPost && description}
        </div>
        {isProfile && isEditingPost && (
          <>
            <Input
              className="w-full border rounded p-2"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            ></Input>
            <Button
              className="mx-2"
              type="primary"
              onClick={() => {
                dispatch(
                  updatePost({
                    id: id,
                    description: newDescription,
                    user: { id: user.id },
                  })
                );
                setIsEditingPost(false);
              }}
            >
              Save
            </Button>
          </>
        )}
        {isProfile && curUser.id == user.id && (
          <EditOutlined
            className="mr-2"
            twoToneColor="#0000ff"
            onClick={() => setIsEditingPost(!isEditingPost)}
          />
        )}
      </div>

      <div>
        {comments?.map((comment, index) => (
          <div key={index} className=" flex w-full justify-between">
            <div>
              <span className="font-semibold mr-4">
                {comment.user.firstName}
              </span>{" "}
              {comment.content}
            </div>
            {(curUser.id == comment.user.id || user.id == curUser.id) && (
              <span className="self-end ml-4">
                {curUser.id == comment.user.id && (
                  <EditOutlined
                    twoToneColor="#0000ff"
                    onClick={() =>
                      handleEditComment(comment.commentID, comment.content)
                    }
                  />
                )}
                <Button
                  type="link"
                  icon={<DeleteTwoTone twoToneColor="#ff0000" />}
                  onClick={() => handleDeleteComment(comment.commentID)}
                />
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex w-full mt-4">
        <input
          type="text"
          placeholder="Add a comment"
          className="w-full border rounded p-2 mr-8"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button
          className="bg-transparent text-slate-500 p-2 rounded"
          onClick={addcomment}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default IndividualPost;
