import React from "react";
import "./Comments.scss";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
interface IProps {
  itemComment: any;
  key: number;
}
const Comments = ({ itemComment, key }: IProps) => {
  const { userAvatarCommented, userID, commentContent, userFullName } = itemComment;
  const navigate = useNavigate();

  return (
    <div className='comments-zone' key={key}>
      <img
        className='comments-zone__img-avatar'
        src={userAvatarCommented}
        alt='avatar'
        onClick={() => navigate(`/profile/${userID}`)}
      />
      <div className='wrapper-comment__bubble'>
        <p onClick={() => navigate(`/profile/${userID}`)}>{userFullName}</p>
        <p>{commentContent}</p>
      </div>
      <i className='comments-zone__edit-comment'>
        <BsThreeDots />
      </i>
    </div>
  );
};

export default Comments;
