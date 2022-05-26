import React, { useState } from "react";
import "./Upload.scss";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { MdPhotoLibrary, MdTagFaces } from "react-icons/md";
import { useAppSelector } from "@store/hooks";
import { useNavigate } from "react-router-dom";

const Upload = (props: any) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isOpenPost, setIsOpenPost] = useState<boolean>(false);
  interface MyToken {
    iat: number;
    id: string;
    role: number;
  }
  return (
    <div className='upload-container'>
      <div className='upload__header'>
        <img
          onClick={()=>
            navigate("/profile")}
          className='img-avatar'
          src={currentUser.userAvatar}
          alt='avatar'
        />
        <div className='upload-input'>
          <div style={{ textDecoration: "none" }} onClick={() => setIsOpenPost(true)}>
            <p className='upload__place-holder'>What is on your mind?</p>
          </div>
        </div>
      </div>
      <hr className='hr-tag' />
      <div className='upload__footer'>
        <button className='btn '>
          <BsFillCameraVideoFill className='btn--live' />
          <p>Live video</p>
        </button>
        <button className='btn '>
          <MdPhotoLibrary className='btn--photo' />
          <p>Photo/video</p>
        </button>
        <button className='btn '>
          <MdTagFaces className='btn--feeling' />
          <p>Feeling/activity</p>
        </button>
      </div>
    </div>
  );
};

export default Upload;
