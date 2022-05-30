import React, { memo, useCallback, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Comments from "@components/common/comment-bubble/Comments";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setViewPost } from "@slices/PostSlice";
import InteractionPost from "../post-features/InteractionPost";
import "./ViewPost.scss";

const ViewPost = () => {
  const dispatch = useAppDispatch();
  const { viewPostData } = useAppSelector((state) => state.post);
  const { dataPost, isViewPost } = viewPostData;
  const closeModal = () => {
    dispatch(setViewPost({ ...viewPostData, isViewPost: false }));
  };
  const convertedTime = new Date(dataPost.time).toLocaleString();

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && isViewPost) {
        dispatch(setViewPost({ ...viewPostData, isViewPost: false }));
      }
    },
    [viewPostData, dispatch, isViewPost]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <div className='view-post__wrapper'>
      <div className='modal-wrapper'>
        <div className='modal-wrapper__left'>
          <img
            className='modal-wrapper__img-post'
            src={dataPost.postAttachments.url}
            alt='camera'
          />
          <AiOutlineClose onClick={closeModal} className='modal-wrapper__close-btn' />
        </div>
        <div className='modal-wrapper__right'>
          <div className='container__content'>
            <div className='container__info'>
              <img className='avatar-img' src={dataPost.userAvatar} alt='avatar' />
              <div className='content__info'>
                <p className='content__info__username'>{dataPost.userName}</p>
                <p className='content__info__timestamp'>{convertedTime}</p>
              </div>
            </div>
            <p className='content__para'>{dataPost.description}</p>
          </div>
          <div className='wrapper-interaction'>
            <p>{`${dataPost.numberOfLike} ${
              dataPost.numberOfLike > 1 ? "likes" : "like"
            }`}</p>
            <p>{`${dataPost.numberOfComment} ${
              dataPost.numberOfComment > 1 ? "comments" : "comment"
            }`}</p>
          </div>
          <hr className='divider' />
          <InteractionPost />
          <hr className='divider' />
          <div className='container__comments'>
            <Comments />
            <Comments />
            <Comments />
            <Comments />
            <Comments />
            <Comments />
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ViewPost);
