import React from 'react'
import "./Post.scss";
import { AiOutlineHeart } from 'react-icons/ai';
import { BiComment, BiShare } from 'react-icons/bi';


function Post(props: any ) {
    const { avatarURL, username, timestamp, content, imgURL } = props;

  return (
    <div className="container" id='container-post'>
        <div className="container__top">
            <img className='img-avatar' src={avatarURL} alt="avatar" />
            <div className="container__top-info">
                <h4>{username}</h4>
                <p>{timestamp}</p>
            </div>
        </div>
        <div className="container__content">
            <p>{content}</p>
        </div>
        <div className="container__img" id='content-img'>
            <img className='img-content' src={imgURL} alt="img" />
        </div>
        <div className="container__status">
            <p>1000 likes</p>
            <p>200 comments</p>
        </div>
        <hr className='hr-tag'/>
        <div className="container__features">
            <button className="container__feature container__feature--like">
                <AiOutlineHeart/>
                <p>Like</p>
            </button>
            <button className="container__feature container__feature--comment">
                <BiComment/>
                <p>Comment</p>
            </button>
            <button className="container__feature--share container__feature ">
                <BiShare/>
                <p>Share</p>
            </button>
        </div>
    </div>
  )
}

export default Post