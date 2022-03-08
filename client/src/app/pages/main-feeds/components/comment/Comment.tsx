import React from 'react'
import './Comment.scss'
import BlankAvatar from "../../../../assets/avatar.png"

const Comment = () => {
  return (
    <div className="comment__container">
        <img src={BlankAvatar} alt="avatar" className="comment__avatar-img" />
        <div className="comment__container__right">
            <div className="comment__content">
                <p className="comment__username">Duongw Thieen Phuc</p>
                <p className="comment__para">
                  src/app/pages/main-feeds/components/header/Header.tsx
                  Line 4:10:   'SiMessenger' is defined but never used              @typescript-eslint/no-unused-vars
                  Line 11:23:  'setCounterNoti' is assigned a value but never used
                </p>
            </div>
            <div className="comment-features">
                <button className='like-comment'>Like</button>
                <button className='reply-comment'>Reply</button>
                <p className='timestamp-text'>12 hours ago</p>
            </div>
        </div>
    </div>
  )
}

export default Comment