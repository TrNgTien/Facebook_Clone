import React, { memo, useState } from "react";
import { MdPhotoLibrary } from "react-icons/md";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import CircleLoading from "@components/common/loading-delay/CircleLoading";
import { AddPost } from "@services/NewsFeedService";
import Icons from "@theme/Icons";
import { setIsCreatePost, setListPosts } from "@slices/PostSlice";
import "./UploadModal.scss";

const UploadInput = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { listPosts } = useAppSelector((state) => state.post);
  const [description, setDescription] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [imageBase64, setImageBase64] = useState<any>("");
  const [errMsg, setErrMsg] = useState("");
  const [isUpLoading, setIsUpLoading] = useState<boolean>(false);
  const ownerToken: string = currentUser.token;

  const handlePreviewFile = (e: any) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
  };

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    setIsUpLoading(true);
    const reader = new FileReader();
    const dataPost = {
      ownerToken,
      description,
      imageBase64,
    };
    const newPostData = {
      time: new Date().toLocaleString(),
      description,
      feedAttachments: {
        url: imageBase64,
      },
      numberOfLike: 0,
      numberOfComment: 0,
      _v: 0,
    };
    const newListPosts = [...listPosts];
    if (!imageBase64 && !description) {
      alert("Please select a file or write a a caption");
    } else if (imageBase64 && description) {
      const addPostRes = await AddPost(dataPost);
      if (addPostRes.status === 200) {
        newListPosts.unshift(newPostData);
        dispatch(setListPosts(newListPosts));
        setIsUpLoading(false);
        dispatch(setIsCreatePost(false));
      }
      reader.onerror = () => {
        setErrMsg("something went wrong!");
      };
    } else if (!imageBase64 && description) {
      const addPostRes = await AddPost(dataPost);
      if (addPostRes.status === 200) {
        newListPosts.unshift(newPostData);
        dispatch(setListPosts(newListPosts));
        setIsUpLoading(false);
        dispatch(setIsCreatePost(false));
      }
      reader.onerror = () => {
        setErrMsg("something went wrong!");
      };
    } else {
      const addPostRes = await AddPost(dataPost);
      if (addPostRes.status === 200) {
        newListPosts.unshift(newPostData);
        dispatch(setListPosts(newListPosts));
        setIsUpLoading(false);
        dispatch(setIsCreatePost(false));
      }
      reader.onerror = () => {
        setErrMsg("something went wrong!");
      };
    }
  };
  return (
    <div className='upload-page'>
      {isUpLoading && <CircleLoading />}
      <div>
        <form onSubmit={handleSubmitForm} className='container-upload-form'>
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
                      setImageBase64(null);
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
              </label>
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
            </div>

            {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
            <input
              className={
                !description && !imageBase64
                  ? "button-upload disabled"
                  : "button-upload enable"
              }
              type='submit'
              value='Post'
              id='submit-post'
              disabled={!description && !imageBase64 ? true : false}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(UploadInput);
