import React, { ChangeEvent, useState } from "react";
import NavigationBar from "../../components/sidebar-navigation/NavigationBar";
import { getCookie } from "../../utils/CookieUtil";
import BlankAvatar from "../../assets/avatar.png"
import "./styles/ProfilePage.scss";
export default function ProfilePage(props: any) {
  const userNameCookie = getCookie("userName");
  const imageUrlCookie = BlankAvatar;
  const [displayName, setDisplayName] = useState<string>(userNameCookie);
  const [displayBirthday, setDisplayBirthday] = useState<string>("");
  const [displayHobbies, setDisplayHobbies] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEditName = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };
  const handleEditBirthday = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayBirthday(e.target.value);
  };
  const handleEditHobbies = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayHobbies(e.target.value);
  };
  return (
    <div className="profile-page">
      <NavigationBar
        imageUrl={imageUrlCookie}
        name={userNameCookie}
        history={props.history}
      />
      <div className="profile-zone">
        <h2 className="title-page">Your Profile</h2>
        <div className="grid profile-zone">
          <div className="row">
            <div className="col l-6">
              <div className="col l-4">
                <img src={imageUrlCookie} alt="img" className="img-profile" />
                {isEdit ? (
                  <button
                    className="confirm-edit__btn"
                    onClick={() => setIsEdit(false)}
                  >
                    Confirm
                  </button>
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
              <form>
                <div className="listing-information">
                  <label className="header-info" htmlFor="fullnameOfUser">
                    Your Display Name
                  </label>
                  <input
                    disabled={isEdit ? false : true}
                    value={displayName}
                    id="fullnameOfUser"
                    autoComplete="off"
                    onChange={handleEditName}
                    className={
                      isEdit ? "input-profile" : "input-profile--disabled "
                    }
                  />
                </div>
                <div className="listing-information">
                  <label className="header-info" htmlFor="birthday">
                    Your Birthday
                  </label>
                  <input
                    type="date"
                    value={displayBirthday}
                    disabled={isEdit ? false : true}
                    autoComplete="off"
                    step={1}
                    onChange={handleEditBirthday}
                    id="birthday"
                    min="1980-01-01"
                    max={new Date().toISOString().split("T")[0]}
                    className={
                      isEdit ? "input-profile" : "input-profile--disabled "
                    }
                  />
                </div>
                <div className="listing-information">
                  <label className="header-info" htmlFor="hobbies">
                    Your Hobbies
                  </label>
                  <input
                    disabled={isEdit ? false : true}
                    autoComplete="off"
                    id="hobbies"
                    onChange={handleEditHobbies}
                    value={displayHobbies}
                    className={
                      isEdit ? "input-profile" : "input-profile--disabled "
                    }
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
