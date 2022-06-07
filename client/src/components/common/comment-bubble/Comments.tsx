import React, { useState, useRef } from "react";
import "./Comments.scss";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import useClickOutSide from "@hooks/useClickOutSide";
import CommentInput from "@components/feat/comment-input/CommentInput";
import { useAppSelector, useAppDispatch } from "@hooks/useStore";
import { setViewPost } from "@slices/PostSlice";

interface IProps {
  itemComment: any;
}
const Comments = ({ itemComment }: IProps) => {
  const { userAvatarCommented, userID, commentContent, userFullName } = itemComment;
  const navigate = useNavigate();
  const [isOpenEditPost, setIsOpenEditPost] = useState(false);
  const editPostRef = useRef(null);
  const [isEditPost, setIsEditPost] = useState(false);
  const { viewPostData } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  const isClickOutSide = useClickOutSide(editPostRef);

  return (
    <div className='comments-zone'>
      <img
        className='comments-zone__img-avatar'
        src={userAvatarCommented}
        alt='avatar'
        onClick={() => {
          viewPostData.isViewPost &&
            dispatch(
              setViewPost({
                ...viewPostData,
                isViewPost: false,
              })
            );
          navigate(`/profile/${userID}`);
        }}
      />
      {isEditPost ? (
        <CommentInput />
      ) : (
        <div className='wrapper-comment__bubble'>
          <p
            onClick={() => {
              viewPostData.isViewPost &&
                dispatch(
                  setViewPost({
                    ...viewPostData,
                    isViewPost: false,
                  })
                );
              navigate(`/profile/${userID}`);
            }}
          >
            {userFullName}
          </p>
          <p>{commentContent}</p>
        </div>
      )}

      <div className='comments-zone__edit-comment' onClick={() => setIsOpenEditPost(true)}>
        <BsThreeDots />
        {!isClickOutSide && isOpenEditPost && (
          <div
            className='edit-modal'
            onClick={() => isClickOutSide && setIsOpenEditPost(false)}
          >
            <div
              className='edit-option'
              onClick={() => {
                setIsOpenEditPost(false);
                setIsEditPost(true);
              }}
              ref={editPostRef}
            >
              <MdEdit className='edit-option__icon-edit' />
              <p>Edit Post</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
