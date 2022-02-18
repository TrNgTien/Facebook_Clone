import React, { ChangeEvent, useState } from "react";
import NavigationBar from "../../components/sidebar-navigation/NavigationBar";
import { getCookie } from "../../utils/CookieUtil";
import "./styles/ProfilePage.scss";

export default function ProfilePage(props: any) {
  const userNameCookie = getCookie("userName");
  const imageUrlCookie = getCookie("imageUrl");
  const [displayName, setDisplayName] = useState<string>(userNameCookie);
  const [displayAge, setDisplayAge] = useState<string>("18");
  const [displayHobbies, setDisplayHobbies] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEditName = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };
  const handleEditAge = (e: ChangeEvent<HTMLInputElement>) => {
    const convertedValue = Number(e.target.value);
    if (convertedValue >= 18 && typeof convertedValue === "number") {
      setDisplayAge(e.target.value);
    }
  };
  const handleEditHobbies = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayHobbies(e.target.value);
  };
  return (
    <div className="profile-page">
      <NavigationBar imageUrl={imageUrlCookie} name={userNameCookie} history={props.history} />
      <div className="profile-zone">
        <h2 className="title-page">Your Profile</h2>
        <div className="grid profile-zone">
          <div className="row">
            <div className="col l-6">
              <div className="col l-4">
                <img src={imageUrlCookie} alt="img" className="img-profile" />
                {isEdit ? (
                  <div className="row">
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
              <form>
                <div className="listing-information">
                  <p className="header-info">Your Display Name</p>
                  <input
                    disabled={isEdit ? false : true}
                    value={displayName}
                    autoComplete="off"
                    onChange={handleEditName}
                    className={
                      isEdit ? "input-profile" : "input-profile--disabled "
                    }
                  />
                </div>
                <div className="listing-information">
                  <p className="header-info">Your Age</p>
                  <input
                    type="range"
                    value={displayAge}
                    disabled={isEdit ? false : true}
                    autoComplete="off"
                    step={1}
                    onChange={handleEditAge}
                    name="volume"
                    min={18}
                    max={100}
                    className={
                      isEdit ? "input-profile" : "input-profile--disabled "
                    }
                  />
                  <p>{displayAge}</p>
                </div>
                <div className="listing-information">
                  <p className="header-info">Your Hobbies</p>
                  <input
                    disabled={isEdit ? false : true}
                    autoComplete="off"
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
