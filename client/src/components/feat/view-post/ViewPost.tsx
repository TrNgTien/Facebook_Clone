import React, { memo, useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Comments from "@components/common/comment-bubble/Comments";
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { setViewPost } from "@slices/PostSlice";
import { MdEdit } from "react-icons/md";
import InteractionPost from "../post-features/InteractionPost";
import { BsThreeDots } from "react-icons/bs";
import { updatePost } from "@services/NewsFeedService";
import CircleLoading from "@components/common/loading-delay/CircleLoading";
import { setListPosts } from "@slices/PostSlice";
import { useNavigate } from "react-router-dom";
import { decodedID } from "@utils/DecodeToken";
import CommentInput from "../comment-input/CommentInput";
import { addComment } from "@services/NewsFeedService";
import "./ViewPost.scss";
const ViewPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { viewPostData, listPosts } = useAppSelector((state) => state.post);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { dataPost, isViewPost } = viewPostData;
  const [isEditPost, setIsEditPost] = useState(false);
  const [isOpenEditPost, setIsOpenEditPost] = useState(false);
  const [caption, setCaption] = useState(dataPost?.description);
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");
  const idPost = dataPost?._id;
  const closeModal = () => {
    dispatch(setViewPost({ ...viewPostData, isViewPost: false }));
  };
  const ownID = decodedID(currentUser.token);
  const convertedTime = new Date(dataPost.time).toLocaleString();
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && isViewPost) {
        dispatch(setViewPost({ ...viewPostData, isViewPost: false }));
      }
    },
    [viewPostData, dispatch, isViewPost]
  );
  const handleSubmit = (e: any) => {
    if (e.key === "Enter") {
      const data = {
        idPost: idPost,
        commentContent: comment,
        token: currentUser.token,
      };
      addComment(data).then(() => {
        dispatch(
          setViewPost({
            ...viewPostData,
            dataPost: {
              ...viewPostData.dataPost,
              comments: [
                ...viewPostData.dataPost.comments,
                {
                  ...data,
                  userAvatarCommented: currentUser.userAvatar.url,
                  userFullName: currentUser.fullName,
                  userID: ownID,
                },
              ],
            },
          })
        );
        setComment("");
      });
    }
  };
  const confirmEditPost = async (e: any) => {
    if (e.key === "Enter") {
      if (caption.length > 0) {
        setIsLoading(true);
        const reqBody = {
          idPost,
          description: caption,
          token: currentUser?.token,
        };
        const updatePostNeed = listPosts.find((item: any) => item._id === idPost);
        const newListPosts = [
          ...listPosts.filter((item: any) => item._id !== idPost),
          { ...updatePostNeed, description: caption },
        ];
        const sortedPosts = newListPosts.sort((a: any, b: any) => {
          return new Date(b.time).valueOf() - new Date(a.time).valueOf();
        });

        const resUpdatePost = await updatePost(reqBody);
        if (resUpdatePost.status === 200) {
          dispatch(setListPosts(sortedPosts));
          setIsLoading(false);
          setIsEditPost(false);
        }
      } else {
        alert("Please enter caption");
      }
    }
  };
  const handleEditPost = async () => {
    if (caption.length > 0) {
      setIsLoading(true);
      const reqBody = {
        idPost,
        description: caption,
        token: currentUser?.token,
      };
      const updatePostNeed = listPosts.find((item: any) => item._id === idPost);
      const newListPosts = [
        ...listPosts.filter((item: any) => item._id !== idPost),
        { ...updatePostNeed, description: caption },
      ];
      const sortedPosts = newListPosts.sort((a: any, b: any) => {
        return new Date(b.time).valueOf() - new Date(a.time).valueOf();
      });

      const resUpdatePost = await updatePost(reqBody);
      if (resUpdatePost.status === 200) {
        dispatch(setListPosts(sortedPosts));
        setIsLoading(false);
        setIsEditPost(false);
      }
    } else {
      alert("Please enter caption");
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  const ListComments = () => {
    return dataPost.comments.map((itemComment: any, index: number) => {
      return <Comments key={index} itemComment={itemComment} />;
    });
  };
  return (
    <div className='view-post__wrapper'>
      <div className='modal-wrapper'>
        {isLoading && <CircleLoading />}
        <div
          className={
            dataPost.postAttachments.url
              ? "modal-wrapper__left"
              : "modal-wrapper__left--hidden"
          }
        >
          <img
            className='modal-wrapper__img-post'
            src={dataPost.postAttachments.url}
            alt='camera'
          />
          <AiOutlineClose onClick={closeModal} className='modal-wrapper__close-btn' />
        </div>

        <div
          className={
            dataPost.postAttachments.url
              ? "modal-wrapper__right"
              : "modal-wrapper__right--only"
          }
          // onClick={() => setIsOpenEditPost(false)}
        >
          <div className='container__content'>
            <div className='container__info'>
              <img
                className='avatar-img'
                onClick={() => {
                  closeModal();
                  navigate(`/profile/${dataPost.userID}`);
                }}
                src={dataPost.userAvatar.url}
                alt='avatar'
              />
              <div className='content__info'>
                <p
                  className='content__info__username'
                  onClick={() => {
                    closeModal();
                    navigate(`/profile/${dataPost.userID}`);
                  }}
                >
                  {dataPost.fullName}
                </p>
                <p className='content__info__timestamp'>{convertedTime}</p>
              </div>
              {dataPost?.userID === ownID ? (
                <>
                  <div className='edit-post__wrapper'>
                    <BsThreeDots
                      className='three-dots__icon'
                      onClick={() => setIsOpenEditPost(!isOpenEditPost)}
                    />
                    {!dataPost.postAttachments.url && (
                      <AiOutlineClose
                        className='close__icon'
                        onClick={() =>
                          dispatch(
                            setViewPost({
                              ...viewPostData,
                              isViewPost: false,
                            })
                          )
                        }
                      />
                    )}
                    {isOpenEditPost && (
                      <div className='edit-modal' onClick={() => setIsOpenEditPost(false)}>
                        <div
                          className='edit-option'
                          onClick={() => {
                            setIsOpenEditPost(false);
                            setIsEditPost(true);
                          }}
                        >
                          <MdEdit className='edit-option__icon-edit' />
                          <p>Edit Post</p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div
                  className='edit-post__wrapper'
                  onClick={() =>
                    dispatch(
                      setViewPost({
                        ...viewPostData,
                        isViewPost: false,
                      })
                    )
                  }
                >
                  <AiOutlineClose className='close__icon' />
                </div>
              )}
            </div>
            {isEditPost ? (
              <div className='edit-caption__zone'>
                <textarea
                  defaultValue={dataPost.description}
                  value={caption}
                  onKeyDown={confirmEditPost}
                  className={
                    dataPost.postAttachments.url
                      ? "edit-caption__input"
                      : "edit-caption__input--caption-only"
                  }
                  onChange={(e) => setCaption(e.target.value)}
                />
                <button className='btn-confirm__edit' onClick={handleEditPost}>
                  Confirm
                </button>
              </div>
            ) : (
              <p className='content__para'>{caption}</p>
            )}
          </div>
          <div className='wrapper-interaction'>
            <p>{`${dataPost.likedPost.length} ${
              dataPost.likedPost.length > 1 ? "likes" : "like"
            }`}</p>
            <p>{`${dataPost.numberOfComment} ${
              dataPost.numberOfComment > 1 ? "comments" : "comment"
            }`}</p>
          </div>
          <hr className='divider' />
          <InteractionPost />
          <hr className='divider' />
          <div className='container__comments'>
            {dataPost.comments.length > 0 ? <ListComments /> : <h2>No Comment Yet...</h2>}
          </div>
          <CommentInput
            postID={idPost}
            ownID={ownID}
            value={comment}
            handleSubmit={(e: any) => handleSubmit(e)}
            handleChangeComment={(e: any) => setComment(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
export default memo(ViewPost);
