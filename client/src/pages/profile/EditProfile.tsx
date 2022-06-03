import React from "react";
import "./styles/EditProfile.scss";
import Icons from "@theme/Icons";

const EditProfile = () => {
  return (
    <div className='edit-profile-page'>
      <div className='edit-profile-background'>
        <div className='edit-profile-container'>
          <div className='edit-profile-container__header'>
            <div className='header__container-title'>
              <p className='header__title-tag'>Edit profile</p>
            </div>
            <div className='header__container-close-btn'>
              <img className='header__close-btn' src={Icons.CLOSE_IC} />
            </div>
          </div>
          <hr className='divider' />
          <div className='edit-profile-container__body'>
            <div className='body__container-profile-field'>
              <div className='profile-field__container-title'>
                <p className='profile-field__title-tag'>Profile picture</p>
                <button className='profile-field__functional-btn'>Edit</button>
              </div>
              <div className='profile-field__container-content'>
                <div className='profile-field__content profile-field__content--container-avatar-img'>
                  <img
                    className='profile-field__avatar-img'
                    src='https://www.w3schools.com/w3css/img_lights.jpg'
                    alt=''
                  />
                </div>
              </div>
            </div>
            <div className='body__container-profile-field'>
              <div className='profile-field__container-title'>
                <p className='profile-field__title-tag'>Cover photo</p>
                <button className='profile-field__functional-btn'>Add</button>
              </div>
              <div className='profile-field__container-content'>
                <div className='profile-field__content profile-field__content--container-background-img'>
                  {false ?? <img className='profile-field__background-img' src='' alt='' />}
                </div>
              </div>
            </div>
            <div className='body__container-profile-field'>
              <div className='profile-field__container-title'>
                <p className='profile-field__title-tag'>Bio</p>
                {true ? (
                  <button className='profile-field__functional-btn functional-btn--add'>
                    Add
                  </button>
                ) : (
                  <button className='profile-field__functional-btn functional-btn--cancel'>
                    Cancel
                  </button>
                )}
              </div>
              <div className='profile-field__container-content'>
                {true ? (
                  <p className='bio__describe-yourself'>Describe yourself...</p>
                ) : (
                  <div className='profile-field__content profile-field__content--container-bio'>
                    <textarea className='bio-description' name='bio-description'></textarea>
                    <button className='bio__button--cancel'>Cancel</button>
                    <button className='bio__button--save'>Save</button>
                  </div>
                )}
              </div>
            </div>
            <div className='body__container-profile-field'>
              <div className='profile-field__container-title'>
                <p className='profile-field__title-tag'>Customize your intro</p>
                <button className='profile-field__functional-btn'>Edit</button>
              </div>
              <div className='profile-field__container-content'>
                <div className='profile-field__content profile-field__content--container-intro'>
                  <div className='container-intro__intro-info'>
                    <p className='intro-info-tag'>Current City</p>
                  </div>
                  <div className='container-intro__intro-info'>
                    <p className='intro-info-tag'>Workplace</p>
                  </div>
                  <div className='container-intro__intro-info'>
                    <p className='intro-info-tag'>School</p>
                  </div>
                  <div className='container-intro__intro-info'>
                    <p className='intro-info-tag'>Hometown</p>
                  </div>
                  <div className='container-intro__intro-info'>
                    <p className='intro-info-tag'>Relationship Status</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='body__container-profile-field'>
              <div className='profile-field__container-title'>
                <p className='profile-field__title-tag'>Hobbies</p>
                <button className='profile-field__functional-btn'>Edit</button>
              </div>
              <div className='profile-field__container-content'>
                <div className='profile-field__content profile-field__content--container-background-img'>
                  <input className='input-hobbies' type='text' name='' id='' />
                </div>
              </div>
            </div>
            <div className='body__container-profile-field'>
              <div className='profile-field__container-title'>
                <p className='profile-field__title-tag'>Featured</p>
                <button className='profile-field__functional-btn'>Edit</button>
              </div>
              <div className='profile-field__container-content'>
                <div className='profile-field__content profile-field__content--container-background-img'></div>
              </div>
            </div>
          </div>
          <div className='edit-profile-container__footer'>
            <button>Edit your about info</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
