import React from "react";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { MdPhotoLibrary, MdTagFaces } from "react-icons/md";
import { useAppSelector, useAppDispatch } from "@hooks/useStore";
import { setIsCreatePost } from "@slices/PostSlice";
import { useNavigate, useParams } from "react-router-dom";
import "./Upload.scss";

const Upload = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className='upload-container'>
      <div className='upload__header'>
        <img
          onClick={() => navigate(`/profile/${id}`)}
          className='img-avatar'
          src={currentUser.userAvatar}
          alt='avatar'
        />
        <div className='upload-input'>
          <div
            style={{ textDecoration: "none" }}
            onClick={() => dispatch(setIsCreatePost(true))}
          >
            <p className='upload__place-holder'>What is on your mind?</p>
          </div>
        </div>
      </div>
      <hr className='divider' />
      <div className='upload__footer'>
        <button className='btn'>
          <BsFillCameraVideoFill className='btn--live' />
          <p>Live video</p>
        </button>
        <button className='btn' onClick={() => dispatch(setIsCreatePost(true))}>
          <MdPhotoLibrary className='btn--photo' />
          <p>Photo</p>
        </button>
        <button className='btn'>
          <MdTagFaces className='btn--feeling' />
          <p>Feeling/activity</p>
        </button>
      </div>
    </div>
  );
};

export default Upload;
