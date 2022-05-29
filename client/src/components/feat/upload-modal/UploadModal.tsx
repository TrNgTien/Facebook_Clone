import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdPhotoLibrary } from "react-icons/md";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import CircleLoading from "@components/common/loading-component/CircleLoading";
import { AddFeed } from "@services/NewsFeedService";
import Icons from "@theme/Icons";
import jwtDecode from "jwt-decode";
import { IJwtDecode } from "@constants/InterfaceModel";
import { setIsCreatePost } from "@slices/PostSlice";
import "./UploadModal.scss";

const UploadInput = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [description, setDescription] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [previewImage, setPreviewImage] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<any>("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const ownerId = jwtDecode<IJwtDecode>(currentUser.token).id;

  const handlePreviewFile = (e: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImageBase64(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    let formData = new FormData();
    if (!selectedFile && !description) return;
    else if (selectedFile) {
      const reader = new FileReader();
      formData.append("userId", currentUser.userId);
      formData.append("description", description);
      formData.append("feedAttachments", selectedFile);
      uploadPost(formData);
      reader.onerror = () => {
        setErrMsg("something went wrong!");
      };
    } else {
      formData.append("userId", currentUser.userId);
      formData.append("description", description);
      formData.append("feedAttachments", "");
      uploadPost(formData);
    }
  };
  const uploadPost = (formData: any) => {
    AddFeed(formData)
      .then((res: any) => {
        setIsRegistering(true);
        setTimeout(() => {
          setIsRegistering(false);
          navigate(-1);
        }, 2000);
      })
      .catch((err: any) => {
        alert(`${err}`);
      });
  };
  return (
    <div className='upload-page'>
      {isRegistering ? <CircleLoading /> : null}
      <div className='container-upload-form'>
        <form onSubmit={handleSubmitForm}>
          <div className='upload-form__header'>
            <h2>Create post</h2>
            <img
              className='upload-form__close-icon'
              src={Icons.CLOSE_IC}
              alt='close-icon'
              onClick={() => dispatch(setIsCreatePost(false))}
            />
          </div>
          <div className='upload-hr'></div>
          <div className='upload-form__body'>
            <div className='upload-form__user'>
              <img
                className='upload-form__user-avatar'
                src={currentUser.userAvatar}
                alt='avatar'
              />
              <p className='upload-form__username'>{currentUser.fullName}</p>
            </div>
            <div className='upload-info'>
              <textarea
                className='upload-info__caption-post'
                value={description}
                placeholder={`What's on your mind, ${currentUser.fullName}?`}
                onChange={(e) => setDescription(e.target.value)}
              />
              {imageBase64 && (
                <div className='preview-container'>
                  <img
                    className='close-upload-img'
                    src={Icons.CLOSE_IC}
                    alt=''
                    onClick={() => {
                      setFileInputState("");
                      setSelectedFile(null);
                      setErrMsg("");
                    }}
                  />
                  <img src={imageBase64} className='img-preview' alt='chosen' />
                </div>
              )}
            </div>
            <div className='upload-form__file-input-container'>
              <label className='file-input__label' htmlFor='inputFile'>
                Add image to your post
              </label>
              <label className='file-input__button' htmlFor='inputFile'>
                <MdPhotoLibrary className='btn-input-photo' />
                <input
                  className='file-input__input'
                  type='file'
                  name='input-file'
                  id='inputFile'
                  accept='image/x-png,image/gif,image/jpeg'
                  onChange={handlePreviewFile}
                  multiple={false}
                  value={fileInputState}
                  hidden
                />
              </label>
            </div>

            {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
            <div className='bottom-upload-container'>
              <input
                className={
                  !description && !selectedFile
                    ? "button-upload disabled"
                    : "button-upload enable"
                }
                type='submit'
                value='Post'
                id='submit-post'
                disabled={!description && !selectedFile ? true : false}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(UploadInput);
