import React from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { useAppSelector, useAppDispatch } from "@hooks/useStore";
import { setViewPost } from "@slices/PostSlice";
import "./Comments.scss";

interface IProps {
  itemComment: any;
}
const Comments = ({ itemComment }: IProps) => {
  const { userAvatarCommented, userID, commentContent, userFullName } = itemComment;
  const navigate = useNavigate();
  const { viewPostData } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

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

      <div className='comments-zone__edit-comment'>
        <BsThreeDots />
      </div>
    </div>
  );
};

export default Comments;
