import React, { useState, useEffect } from "react";
import "./Post.scss";
import { AiOutlineHeart } from "react-icons/ai";
import { BiComment, BiShare } from "react-icons/bi";
import { Modal } from "../../feat/post-modal/PostModal";
import { getProfileID } from "@services/FeedsService";
import { useAppSelector } from "@store/hooks";

function Post(props: any) {
  const { time, description, feedAttachments, numberOfLike, numberOfComment, userID } =
    props.post;
  const { currentUser } = useAppSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  const [posterData, setPosterData] = useState<any>(null);
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
    <>
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
        <div className='container__img' id='content-img' onClick={openModal}>
          {feedAttachments ? (
            <img className='img-content' src={feedAttachments} alt='img' />
          ) : (
            <div></div>
          )}
        </div>
        <div className='container__status'>
          <p>{numberOfLike} likes</p>
          <p>{numberOfComment} comments</p>
        </div>
        <hr className='hr-tag' />
        <div className='container__features'>
          <button className='container__feature container__feature--like'>
            <AiOutlineHeart />
            <p>Like</p>
          </button>
          <button className='container__feature container__feature--comment'>
            <BiComment />
            <p>Comment</p>
          </button>
          <button className='container__feature--share container__feature '>
            <BiShare />
            <p>Share</p>
          </button>
        </div>
        <hr className='hr-tag' />
      </div>
      {/* <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          dataPost={props.post}
          poster={posterData}
        /> */}
    </>
  );
}

export default Post;
