import React, { useState, useEffect } from "react";
import { BiComment, BiShare, BiLike } from "react-icons/bi";
import { getProfileID } from "@services/NewsFeedService";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { setViewPost } from "@slices/PostSlice";
import "./Posts.scss";
import InteractionPost from "@components/feat/post-features/InteractionPost";
interface IProps {
  postData: any;
}

function Post({ postData }: IProps) {
  const dispatch = useAppDispatch();
  const { time, description, feedAttachments, numberOfLike, numberOfComment, userID } =
    postData;
  const { currentUser } = useAppSelector((state) => state.auth);
  const { viewPostData } = useAppSelector((state) => state.post);
  const [posterData, setPosterData] = useState<any>([]);

  useEffect(() => {
    const getProfileData = async () => {
      const profileRes = await getProfileID(currentUser.token, userID);
      if (profileRes.status === 200) {
        setPosterData(profileRes.data.data);
      }
    };
    getProfileData();
  }, [userID, currentUser.token]);

  return (
    <div className='container' id='container-post'>
      <div className='container__top'>
        <img className='img-avatar' src={posterData?.userAvatar} alt='avatar' />
        <div className='container__top-info'>
          <h4>{posterData?.userName}</h4>
          <p>{time}</p>
        </div>
      </div>
      <div className='container__content'>
        <p>{description}</p>
      </div>
      <div className='container__img' id='content-img'>
        {feedAttachments.url ? (
          <img
            className='img-content'
            onClick={() =>
              dispatch(
                setViewPost({
                  ...viewPostData,
                  isViewPost: true,
                  dataPost: {
                    ...postData,
                    userName: posterData?.userName,
                    userAvatar: posterData?.userAvatar,
                  },
                })
              )
            }
            src={feedAttachments.url}
            alt='img'
          />
        ) : null}
      </div>
      <div className='container__status'>
        <p>{numberOfLike > 0 ? `${numberOfLike} likes` : `${numberOfLike} like`} </p>
        <p>
          {numberOfComment > 0
            ? `${numberOfComment} comments`
            : `${numberOfComment} comment`}
        </p>
      </div>
      <hr className='divider' />
      <InteractionPost />
    </div>
  );
}

export default Post;
