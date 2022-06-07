import React, { memo } from "react";
import "./CommentInput.scss";
import { useAppSelector, useAppDispatch } from "@hooks/useStore";
import { useNavigate } from "react-router-dom";
import { setViewPost } from "@slices/PostSlice";
function CommentInput(props: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { viewPostData } = useAppSelector((state) => state.post);
  const { handleSubmit, value, ownID, handleChangeComment } = props;
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
          navigate(`/profile/${ownID}`);
        }}
      />
      <input
        type='text'
        value={value}
        onKeyDown={(e) => handleSubmit(e)}
        onChange={(e) => handleChangeComment(e)}
        className='container-comment__comment-input'
        placeholder='Write a comment...'
      />
    </div>
  );
}

export default memo(CommentInput);
