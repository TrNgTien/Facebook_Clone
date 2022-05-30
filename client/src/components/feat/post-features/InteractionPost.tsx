import React, { memo } from "react";
import { BiComment, BiShare, BiLike } from "react-icons/bi";
import "./InteractionPost.scss";
function InteractionPost() {
  return (
    <div className='container__features'>
      <button className='container__feature'>
        <BiLike />
        <p>Like</p>
      </button>
      <button className='container__feature'>
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
