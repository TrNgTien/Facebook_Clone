import React, { useState, useEffect } from "react";
import { getProfileID } from "@services/ProfileService";
import { useAppSelector, useAppDispatch } from "@hooks/useStore";
import { BsThreeDots } from "react-icons/bs";
import { setViewPost } from "@slices/PostSlice";
import InteractionPost from "@components/feat/post-features/InteractionPost";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { decodedID } from "@utils/DecodeToken";

import "./Posts.scss";
interface IProps {
  postData: any;
  handleDeletePost: any;
}

function Post({ postData, handleDeletePost }: IProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { time, description, postAttachments, likedPost, numberOfComment, userID } =
    postData;
  const [ownID, setOwnID] = useState<string>();

  const { viewPostData } = useAppSelector((state) => state.post);
  const [posterData, setPosterData] = useState<any>([]);
  const convertedTime = new Date(time).toLocaleString();
  useEffect(() => {
    if (currentUser) {
      setOwnID(decodedID(currentUser?.token));
    }
    const getProfileData = async () => {
      const profileRes = await getProfileID(userID);
      if (profileRes.status === 200) {
        setPosterData(profileRes.data.data);
      }
    };
    getProfileData();
  }, [userID, currentUser]);
  const reqDeletePost = () => {
    handleDeletePost(postData._id);
  };
  return (
    <div className='container' id='container-post'>
      <div className='container__top'>
        <img
          className='img-avatar'
          src={posterData.userAvatar?.url}
          alt='avatar'
          onClick={() => navigate(`/profile/${postData?.userID}`)}
        />
        <div className='container__top-info'>
          <h4 className='container__top-username'>
            {posterData?.firstName + " " + posterData?.lastName}
          </h4>
          <p className='container__top-timestamp'>{convertedTime}</p>
        </div>
        {currentUser && postData?.userID === ownID && (
          <i className='three-dot__icon'>
            <AiOutlineClose onClick={reqDeletePost} />
          </i>
        )}
      </div>
      <div className='container__content'>
        <p
          onClick={() =>
            currentUser
              ? dispatch(
                  setViewPost({
                    ...viewPostData,
                    isViewPost: true,
                    dataPost: {
                      ...postData,
                      fullName: posterData?.firstName + " " + posterData?.lastName,
                      userAvatar: posterData?.userAvatar,
                    },
                  })
                )
              : navigate("/")
          }
          className='caption-post'
        >
          {description}
        </p>
      </div>
      <div className='container__img' id='content-img'>
        {postAttachments.url && (
          <img
            className='img-content'
            onClick={() =>
              currentUser
                ? dispatch(
                    setViewPost({
                      ...viewPostData,
                      isViewPost: true,
                      dataPost: {
                        ...postData,
                        fullName: posterData?.firstName + " " + posterData?.lastName,
                        userAvatar: posterData?.userAvatar,
                      },
                    })
                  )
                : navigate("/")
            }
            src={postAttachments.url}
            alt='img'
          />
        )}
      </div>
      <div className='container__status'>
        <p onClick={() => (currentUser ? console.log("like") : navigate("/"))}>
          {likedPost.length > 1 ? `${likedPost.length} likes` : `${likedPost.length} like`}
        </p>
        <p onClick={() => (currentUser ? console.log("cmt") : navigate("/"))}>
          {numberOfComment > 1
            ? `${numberOfComment} comments`
            : `${numberOfComment} comment`}
        </p>
      </div>
      <hr className='divider' />
      <InteractionPost />
    </div>
  );
}

const PostLoading = () => {
  return (
    <div className='container' id='container-post'>
      <div className='container__top'>
        <div className='img-avatar skeleton'></div>
        <div className='container__top-info '>
          <div className='container__top-username skeleton'></div>
          <div className='container__top-timestamp skeleton'></div>
        </div>
        <i className='three-dot__icon'>
          <BsThreeDots />
        </i>
      </div>
      <div className='container__content'>
        <p className='caption-post skeleton'></p>
      </div>
      <div className='container__img skeleton' id='content-img'></div>
      <div className='container__status'>
        <p></p>
        <p></p>
      </div>
      <hr className='divider' />
    </div>
  );
};

Post.PostLoading = PostLoading;

export default Post;
