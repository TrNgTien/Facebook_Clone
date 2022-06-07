import React, { useState } from "react";
import "./CommentInput.scss";
import { useAppSelector, useAppDispatch } from "@hooks/useStore";
import { useNavigate } from "react-router-dom";
import { setViewPost } from "@slices/PostSlice";
import { addComment } from "@services/NewsFeedService";
function CommentInput(props: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { viewPostData } = useAppSelector((state) => state.post);
  const [comment, setComment] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (e.key === "Enter") {
      const data = {
        postId: viewPostData.id,
        commentContent: comment,
        userId: currentUser.id,
      };
      addComment(data).then(() => {
        dispatch(
          setViewPost({
            ...viewPostData,
            dataPost: {
              ...viewPostData.dataPost,
              comments: [...viewPostData.dataPost.comments, data],
            },
          })
        );
        setComment("");
      });
    }
  };
  return (
    <div className='container-comment'>
      <img
        className='container-comment__img-avatar'
        src={currentUser.userAvatar?.url}
        alt='avatar'
        onClick={() => {
          viewPostData.isViewPost &&
            dispatch(
              setViewPost({
                ...viewPostData,
                isViewPost: false,
              })
            );
          navigate(`/profile/${props.ownID}`);
        }}
      />
      <input
        type='text'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => handleSubmit(e)}
        className='container-comment__comment-input'
        placeholder='Write a comment...'
      />
    </div>
  );
}

export default CommentInput;
