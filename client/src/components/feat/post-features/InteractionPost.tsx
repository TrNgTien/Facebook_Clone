import React, { memo } from "react";
import { BiComment, BiShare, BiLike } from "react-icons/bi";
import { useAppSelector, useAppDispatch } from "@hooks/useStore";
import { useNavigate } from "react-router-dom";
import "./InteractionPost.scss";
import { setViewCommentPost } from "@slices/PostSlice";
function InteractionPost({ postID }: any) {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { viewCommentPost } = useAppSelector((state) => state.post);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
        onClick={() =>
          currentUser
            ? dispatch(
                setViewCommentPost({
                  ...viewCommentPost,
                  isView: true,
                  idPost: postID,
                })
              )
            : navigate("/")
        }
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
