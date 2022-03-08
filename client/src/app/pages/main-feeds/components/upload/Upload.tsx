import React from 'react'
import './Upload.scss'
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { MdPhotoLibrary, MdTagFaces } from 'react-icons/md';

const Upload = (props: any) => {
    const {avatarURL} = props;
  return (
    <div className='upload-container'>
        <div className="upload__header">
            <img className='img-avatar' src={avatarURL} alt="avatar" />
            <input className='upload-input' type="text" name="upload" id="status" placeholder='What is on your mind?' />
        </div>
        <hr className='hr-tag'/>
        <div className="upload__footer">
            <button className="btn ">
                <BsFillCameraVideoFill className='btn--live'/>
                <p>Live video</p>
            </button>
            <button className="btn ">
                <MdPhotoLibrary className='btn--photo'/>
                <p>Photo/video</p>
            </button>
            <button className="btn ">
                <MdTagFaces className='btn--feeling'/>
                <p>Feeling/activity</p>
            </button>
        </div>
    </div>
  )
}

export default Upload