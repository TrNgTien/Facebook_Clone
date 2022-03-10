import React, { useCallback, useEffect, useRef } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiComment, BiShare } from 'react-icons/bi';
import { MdOutlineClose } from 'react-icons/md';
import Comment from '../comment/Comment';
import './PostModal.scss'

export const Modal = ({ showModal, setShowModal, props } : {showModal:boolean, setShowModal:any, props:any}) => {
  const { avatarURL, username, timestamp, content, imgURL } = props;
    const modalRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const closeModal = (e:any) => {
      if (modalRef.current === e.target) {
        setShowModal(false);
      }
    };
    const keyPress = useCallback(
        e => {
          if (e.key === 'Escape' && showModal) {
            setShowModal(false); 
          }
        },
        [setShowModal, showModal]
      );
    
      useEffect(
        () => {
          document.addEventListener('keydown', keyPress);
          return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
      );
    
    return (
      <>
        {showModal ? (
          <div className='container__background' onClick={closeModal} ref={modalRef}>
            <div className='modal-wrapper'>
                <div className='modal-wrapper__left'>
                    <img className='img-content' src={imgURL} alt='camera' />
                    <MdOutlineClose onClick={() => setShowModal((prev: boolean) => !prev)} className='close-button'/>
                </div>
                <div className='modal-wrapper__right'>
                    <div className="container__content">
                        <div className="container__info">
                            <img className='avatar-img' src={avatarURL} alt="avatar" />
                            <div className="content__info">
                                <p className="content__info__username">{username}</p>
                                <p className="content__info__timestamp">{timestamp}</p>
                            </div>
                        </div>
                        <p className="content__para">{content}</p>
                    </div>
                    <div className="container__interaction">
                        <p>100 likes</p>
                        <p>1000 comments</p>
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
                    <hr className='hr-tag'/>
                    <div className="container__comments">
                      <Comment/>
                    </div>
                </div>
            </div>
        </div>
        ) : null}
      </>
    );
  };
  