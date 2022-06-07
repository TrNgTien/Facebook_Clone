import React, { memo } from "react";
import { BiComment, BiShare, BiLike } from "react-icons/bi";
import { useAppSelector, useAppDispatch } from "@hooks/useStore";
import { useNavigate } from "react-router-dom";
import "./InteractionPost.scss";

function InteractionPost() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className='container__features'>
      <button
        className='container__feature'
        onClick={() => (currentUser ? console.log("like") : navigate("/"))}
      >
        <BiLike />
        <p>Like</p>
      </button>
      <button
        className='container__feature'
        onClick={() => (currentUser ? console.log("cmt") : navigate("/"))}
      >
        <BiComment />
        <p>Comment</p>
      </button>
      <button className='container__feature'>
        <BiShare />
        <p>Share</p>
      </button>
    </div>
  );
}

export default memo(InteractionPost);
