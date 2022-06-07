import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import "./styles/EditProfile.scss";
import Icons from "@theme/Icons";
import {
  IoAdd,
  IoBriefcase,
  IoHeart,
  IoHomeSharp,
  IoLocationSharp,
  IoSchoolSharp,
} from "react-icons/io5";
import jwtDecode from "jwt-decode";
import { IJwtDecode } from "@constants/InterfaceModel";
import {
  getProfileID,
  updateAvatar,
  updateCover,
  updateUserInfo,
} from "@services/ProfileService";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@hooks/useStore";
import { setUpdateUser } from "@slices/AuthenSlice";

interface EditProfileProps {
  currentUser: any;
  setOpenEdit: any;
}

const EditProfile: FC<EditProfileProps> = (props): JSX.Element => {
  const inputAvatarRef = useRef<any>(null);
  const inputCoverRef = useRef<any>(null);
  const initialProfile = {
    userAvatar: props.currentUser.userAvatar.url,
    coverPhoto: props.currentUser.userCover.url,
    bio: props.currentUser.biography,
    intro: { ...props.currentUser.intro },
    hobbies: [...props.currentUser.hobbies],
  };
  const dispatch = useDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [openAddBio, setOpenAddBio] = useState(false);
  const [editIntro, setEditIntro] = useState(false);
  const [userProfile, setUserProfile] = useState(initialProfile);
  const [profileChange, setProfileChange] = useState({});
  const [enterHobby, setEnterHobby] = useState("");
  const [bioChange, setBioChange] = useState({});
  const [avatarChange, setAvatarChange] = useState<string | ArrayBuffer | null>("");
  const [coverChange, setCoverChange] = useState<string | ArrayBuffer | null>("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const decodedID = jwtDecode<IJwtDecode>(props.currentUser.token).id;
    setCurrentUserId(decodedID);
  }, []);

  const handlePreviewFile = (e: any) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUserProfile({ ...userProfile, [e.target.name]: reader.result });
      if (e.target.name === "userAvatar") {
        setAvatarChange(reader.result);
      }
      if (e.target.name === "coverPhoto") {
        setCoverChange(reader.result);
      }
    };
  };

  const handleAddHobbies = () => {
    setUserProfile({ ...userProfile, hobbies: [...userProfile.hobbies, enterHobby] });
    setProfileChange({
      hobbies: [...userProfile.hobbies, enterHobby],
    });
  };
  const bioOnChange = (e: ChangeEvent<any>) => {
    setProfileChange({ ...profileChange, biography: e.target.value });
    setBioChange({ biography: e.target.value });
  };
  const handleBioChange = async () => {
    const resUpdateInfo = await updateUserInfo({
      userProfile: bioChange,
      userId: currentUserId,
      token: props.currentUser.token,
    });
  };
  // const handleIntroOnChange = (e: ChangeEvent<any>) => {
  //   const initIntro = {
  //     currentJob: "",
  //     currentEducation: "",
  //     currentCity: "",
  //     hometown: "",
  //     relationship: "",
  //   };
  //   setProfileChange({
  //     intro: { prev =>...initIntro, [e.target.name]: e.target.value },
  //   });
  //   console.log(profileChange);
  // };

  const handleEditProfile = async () => {
    setIsLoading(true);

    const resUpdateInfo = await updateUserInfo({
      userProfile: profileChange,
      userId: currentUserId,
      token: props.currentUser.token,
    });
    if (avatarChange) {
      const resUpdateAvatar = await updateAvatar({
        imageBase64: avatarChange,
        token: props.currentUser.token,
        userId: currentUserId,
      });
    }
    if (coverChange) {
      const resUpdateCover = await updateCover({
        imageBase64: coverChange,
        token: props.currentUser.token,
        userId: currentUserId,
      });
    }

    if (resUpdateInfo.status === 200) {
      setIsLoading(false);
      const newUser = getProfileID(currentUserId).then((res) => {
        dispatch(setUpdateUser({ ...currentUser, ...res.data.data }));
      });
      props.setOpenEdit(false);
    }
  };
  return (
    <div className='edit-profile-page'>
      <div className='edit-profile-background'>
        <div className='edit-profile-container'>
          <div className='edit-profile-container__header'>
            <div className='header__container-title'>
              <p className='header__title-tag'>Edit profile</p>
            </div>
            <div
              className='header__container-close-btn'
              onClick={() => props.setOpenEdit(false)}
            >
              <img className='header__close-btn' src={Icons.CLOSE_IC} alt='' />
            </div>
          </div>
          <hr className='divider' />
          <div className='edit-profile-container__body'>
            <div className='body__container-profile-field'>
              <div className='profile-field__container-title'>
                <p className='profile-field__title-tag'>Profile picture</p>

                <button
                  className='profile-field__functional-btn'
                  onClick={() => inputAvatarRef.current.click()}
                >
                  Edit
                  <input
                    className='file-input__input'
                    type='file'
                    name='userAvatar'
                    ref={inputAvatarRef}
                    id='inputFile'
                    accept='image/x-png,image/gif,image/jpeg'
                    onChange={handlePreviewFile}
                    multiple={false}
                    hidden
                  />
                </button>
              </div>
              <div className='profile-field__container-content'>
                <div className='profile-field__content profile-field__content--container-avatar-img'>
                  <img
                    className='profile-field__avatar-img'
                    src={userProfile.userAvatar}
                    alt=''
                  />
                </div>
              </div>
            </div>
            <div className='body__container-profile-field'>
              <div className='profile-field__container-title'>
                <p className='profile-field__title-tag'>Cover photo</p>
                <button
                  className='profile-field__functional-btn'
                  onClick={() => inputCoverRef.current.click()}
                >
                  Add
                  <input
                    className='file-input__input'
                    type='file'
                    name='coverPhoto'
                    ref={inputCoverRef}
                    id='inputFile'
                    accept='image/x-png,image/gif,image/jpeg'
                    onChange={handlePreviewFile}
                    multiple={false}
                    hidden
                  />
                </button>
              </div>
              <div className='profile-field__container-content'>
                <div className='profile-field__content profile-field__content--container-background-img'>
                  <img
                    className='profile-field__background-img'
                    src={userProfile.coverPhoto}
                    alt=''
                  />
                </div>
              </div>
            </div>
            <div className='body__container-profile-field'>
              <div className='profile-field__container-title'>
                <p className='profile-field__title-tag'>Bio</p>
                {openAddBio ? (
                  <button
                    className='profile-field__functional-btn functional-btn--cancel'
                    onClick={() => setOpenAddBio((prev) => !prev)}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    className='profile-field__functional-btn functional-btn--add'
                    onClick={() => setOpenAddBio((prev) => !prev)}
                  >
                    Add
                  </button>
                )}
              </div>
              <div className='profile-field__container-content'>
                {openAddBio ? (
                  <div className='profile-field__content profile-field__content--container-bio'>
                    <textarea
                      className='bio-description'
                      name='bio-description'
                      placeholder='Describe who you are'
                      onChange={bioOnChange}
                    ></textarea>
                    <div className='bio-btns'>
                      <button
                        className='bio__button--cancel'
                        onClick={() => setOpenAddBio(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className='bio__button--save'
                        onClick={() => handleBioChange()}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : userProfile.bio ? (
                  <p className='bio__describe-yourself'>{userProfile.bio}</p>
                ) : (
                  <p className='bio__describe-yourself'>Describe yourself...</p>
                )}
              </div>
            </div>
            {/* <div className='body__container-profile-field'>
              <div className='profile-field__container-title'>
                <p className='profile-field__title-tag'>Customize your intro</p>
                <button
                  className='profile-field__functional-btn'
                  onClick={() => setEditIntro((prev) => !prev)}
                >
                  Add
                </button>
              </div>
              <div className='profile-field__container-content'>
                <div className='profile-field__content profile-field__content--container-intro'>
                  <div className='container-intro__intro-info'>
                    <IoHomeSharp />
                    {editIntro ? (
                      <input
                        type='text'
                        className='intro_info-input'
                        placeholder='Your current city'
                        name='currentCity'
                      />
                    ) : (
                      <p className='intro-info-tag'>Current City</p>
                    )}
                  </div>
                  <div className='container-intro__intro-info'>
                    <IoBriefcase />
                    {editIntro ? (
                      <input
                        type='text'
                        className='intro_info-input'
                        placeholder='Your workplace'
                        name='currentJob'
                      />
                    ) : (
                      <p className='intro-info-tag'>Workplace</p>
                    )}
                  </div>
                  <div className='container-intro__intro-info'>
                    <IoSchoolSharp />
                    {editIntro ? (
                      <input
                        type='text'
                        className='intro_info-input'
                        placeholder='Your school'
                        name='currentEducation'
                      />
                    ) : (
                      <p className='intro-info-tag'>School</p>
                    )}
                  </div>
                  <div className='container-intro__intro-info'>
                    <IoLocationSharp />
                    {editIntro ? (
                      <input
                        type='text'
                        className='intro_info-input'
                        placeholder='Your hometown'
                        name='hometown'
                      />
                    ) : (
                      <p className='intro-info-tag'>Hometown</p>
                    )}
                  </div>
                  <div className='container-intro__intro-info'>
                    <IoHeart />
                    {editIntro ? (
                      <input
                        type='text'
                        className='intro_info-input'
                        placeholder='Your relationship'
                        name='relationship'
                      />
                    ) : (
                      <p className='intro-info-tag'>Relationship Status</p>
                    )}
                  </div>
                </div>
              </div>
            </div> */}
            <div className='body__container-profile-field'>
              <div className='profile-field__container-title'>
                <p className='profile-field__title-tag'>Hobbies</p>
                <button className='profile-field__functional-btn'>Edit</button>
              </div>
              <div className='profile-field__container-content'>
                <div className='profile-field__content profile-field__content--container-hobbies'>
                  {userProfile.hobbies.map((hobby, index) => (
                    <div className='container-hobbies' key={index}>
                      <p className='hobby-tag-name'>{hobby}</p>
                    </div>
                  ))}
                  <input
                    className='input-hobbies'
                    type='text'
                    placeholder='Enter your hobbies'
                    onChange={(e) => setEnterHobby(e.target.value)}
                  />
                  <button className='add-hobbies' onClick={handleAddHobbies}>
                    <IoAdd />
                  </button>
                </div>
              </div>
            </div>
            <div className='body__container-profile-field'>
              <div className='profile-field__container-title'>
                <p className='profile-field__title-tag'>Featured</p>
                <button className='profile-field__functional-btn'>Add</button>
              </div>
              <div className='profile-field__container-content'>
                <div className='profile-field__content profile-field__content--container-feature-img'>
                  <img
                    className='feature-img'
                    src='https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/gL1slwup025.png'
                    alt=''
                  />
                  <p className='feature-desc'>
                    Feature your favorite photos and stories here for all your friends to
                    see.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='edit-profile-container__footer'>
            <button className='footer-accept-btn' onClick={handleEditProfile}>
              Edit your about info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
