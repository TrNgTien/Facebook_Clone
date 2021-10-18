import React, { useState } from "react";
import img from "../../assets/img.jpg";
import NavigationBar from "../../components/sidebar-navigation/NavigationBar";
import "./styles/ProfilePage.scss";

export default function ProfilePage(props: any) {
  const { email, imageUrl, name } = props.location.state;
  const [displayName, setDisplayName] = useState<string>(name);
  const [displayEmail, setDisplayEmail] = useState<string>(email);
  const [displayHobbies, setDisplayHobbies] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <div className="profile-page">
      <NavigationBar imageUrl={imageUrl} name={name} history={props.history} />
      <div className="profile-zone">
        <h2 className="title-page">Your Profile</h2>
        <div className="grid profile-zone">
          <div className="row">
            <div className="col l-6">
              <div className="col l-4">
                <img src={imageUrl} alt="img" className="img-profile" />
                {isEdit ? (
                  <div className="row">
                    <div className="col l-6">
                      <button
                        className="edit-profile__btn"
                        onClick={() => setIsEdit(true)}
                      >
                        Edit Profile
                      </button>
                    </div>
                    <div className="col l-6">
                      <button
                        className="confirm-edit__btn"
                        onClick={() => setIsEdit(false)}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="edit-profile__btn"
                    onClick={() => setIsEdit(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
            <div className="col l-2">
              <div className="listing-information">
                <p className="header-info">Your Display Name</p>
                <input
                  disabled={isEdit ? false : true}
                  value={displayName}
                  className={
                    isEdit ? "input-profile" : "input-profile--disabled "
                  }
                />
              </div>
              <div className="listing-information">
                <p className="header-info">Your Age</p>
                <input
                  value={displayEmail}
                  disabled={isEdit ? false : true}
                  className={
                    isEdit ? "input-profile" : "input-profile--disabled "
                  }
                />
              </div>
              <div className="listing-information">
                <p className="header-info">Your Hobbies</p>
                <input
                  disabled={isEdit ? false : true}
                  value={displayHobbies}
                  className={
                    isEdit ? "input-profile" : "input-profile--disabled "
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
