import React from "react";
import "./CommentInput.scss";
import { useAppSelector, useAppDispatch } from "@hooks/useStore";
import { useNavigate } from "react-router-dom";
import { setViewPost } from "@slices/PostSlice";
function CommentInput(props: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { viewPostData } = useAppSelector((state) => state.post);

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
        className='container-comment__comment-input'
        placeholder='Write a comment...'
      />
    </div>
  );
}

export default CommentInput;
