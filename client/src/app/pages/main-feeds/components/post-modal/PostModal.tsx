import { Button } from '@mui/material';
import React, { useRef } from 'react';
import './PostModal.scss'

export const Modal = ({ showModal, setShowModal } : {showModal:boolean, setShowModal:any}) => {
    const modalRef = useRef();

    const closeModal = (e:any) => {
      if (modalRef.current === e.target) {
        setShowModal(false);
      }
    };

    return (
      <>
        {showModal ? (
          <div className='container__background' onClick={closeModal}>
            <div className='modal-wrapper'>
              <img className='modal-wrapper__img' src={''} alt='camera' />
              <div className='modal-wrapper__content'>
                <h1>Hello</h1>
                <button onClick={() => setShowModal((prev: boolean) => !prev)}>Close</button>
              </div>
            </div>
        </div>
        ) : null}
      </>
    );
  };
  