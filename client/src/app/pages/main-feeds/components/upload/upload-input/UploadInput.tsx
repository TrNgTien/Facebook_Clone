import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdPhotoLibrary } from "react-icons/md";
import CircleLoading from "../../../../../components/loading-component/CircleLoading";
import { AddFeed } from "../../../../../services/FeedsService";
import "./UploadInput.scss";
import BlankAvatar from "../../../../../assets/avatar.png";
const UploadInput = () => {
  const userId = "62617ee6499247e9d43b0351";
  const IMG_ICON_CLOSE = "https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png";
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [errMsg, setErrMsg] = useState("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
    };
  };

  const handleSubmitForm = (e: any) => {
    e.preventDefault();

    if (!selectedFile && !description) return;
    let formData = new FormData();
    if (selectedFile) {
      const reader = new FileReader();

      formData.append("userId", userId);
      formData.append("description", description);
      formData.append("feedAttachments", selectedFile);
      uploadPost(formData);

      reader.onerror = () => {
        setErrMsg("something went wrong!");
      };
    } else {
      formData.append("userId", userId);
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
            <h2 className='title-upload'>Create post</h2>
            <img
              className='close-upload-form'
              src={IMG_ICON_CLOSE}
              alt=''
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
          <div className='upload-hr'></div>
          <div className='upload-form__body'>
            <div className='upload-form__user'>
              <img className='upload-form__user-avatar' src={BlankAvatar} alt='' />
              <p className='upload-form__username'>Phuc Duong</p>
            </div>
            <div className='upload-info'>
              <textarea
                className='text-input'
                value={description}
                maxLength={10}
                placeholder={"What's on your mind, Phuc?"}
                onChange={(e) => setDescription(e.target.value)}
              />
              {previewSource && (
                <div className='preview-container'>
                  <img
                    className='close-upload-img'
                    src={IMG_ICON_CLOSE}
                    alt=''
                    onClick={() => {
                      setFileInputState("");
                      setPreviewSource("");
                      setSelectedFile(undefined);
                      setErrMsg("");
                    }}
                  />
                  <img src={previewSource} className='img-preview' alt='chosen' />
                </div>
              )}
            </div>
            <div className='upload-form__file-input-container'>
              <p className='file-input__label'>Add image to your post</p>
              <label
                className='file-input__button'
                onChange={handleFileInputChange}
                htmlFor='inputFile'
              >
                <MdPhotoLibrary className='btn-input-photo' />
                <input
                  className='file-input__input'
                  type='file'
                  name='input-file'
                  id='inputFile'
                  accept='.png,.jpg,.jpeg'
                  multiple={false}
                  value={fileInputState}
                  hidden
                />
              </label>
            </div>

            {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
            <div className='bottom-upload-container'>
              {!description && !selectedFile ? (
                <input
                  className='button-upload disabled'
                  type='submit'
                  value='Post'
                  id='submit-post'
                  disabled
                />
              ) : (
                <input
                  className='button-upload enable'
                  type='submit'
                  value='Post'
                  id='submit-post'
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadInput;
