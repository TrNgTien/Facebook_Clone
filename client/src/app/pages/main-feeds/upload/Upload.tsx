import React from 'react'
import './Upload.scss'
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { MdPhotoLibrary, MdTagFaces } from 'react-icons/md';

const Upload = (props: any) => {
    const {avatarURL} = props;
  return (
    <div className='upload'>
        <div className="upload__header">
            <img src={avatarURL} alt="avatar" />
            <input type="text" name="upload" id="status" placeholder='What is on your mind&#39;s' />
        </div>
        <hr />
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