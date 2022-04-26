import React from "react";
import "./Upload.scss";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { MdPhotoLibrary, MdTagFaces } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Upload = (props: any) => {
  const location = useLocation();
  const { avatarURL } = props;
  interface MyToken {
    iat: number;
    id: string;
    role: number;
  }
  const state = location.state as MyToken;
  const { id } = state;
  console.log("id: ", id);

  return (
    <div className='upload-container'>
      <div className='upload__header'>
        <img className='img-avatar' src={avatarURL} alt='avatar' />
        <div className='upload-input'>
          <Link
            style={{ textDecoration: "none" }}
            to='/upload'
            state={{ backgroundLocation: location }}
          >
            <p className='p-tag__place-holder'>What is on your mind?</p>
          </Link>
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
