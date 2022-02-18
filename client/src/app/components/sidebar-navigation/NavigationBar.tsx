import React, { MouseEvent, FC } from "react";
import "./styles/NavigationBar.scss";
import { removeCookie } from "../../utils/CookieUtil";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
const NavigationBar = (props: any) => {
  const listNavigation = [
    { id: 1, tab: "Profile" },
    { id: 2, tab: "General Chat" },
    { id: 3, tab: "Question Matching" },
  ];
  const { imageUrl, name, history } = props;
  const navigateClick = (event: any) => {
    const tabNavigate = event.target.id;
    return tabNavigate === "General Chat"
      ? history.push("/chatting")
      : tabNavigate === "Question Matching"
      ? history.push("/matching")
      : history.push("/profile");
  };

  const logOut = () => {
    removeCookie("userName");
    removeCookie("imageUrl");
    history.push("/");
  };
  const ListingOption: FC = () => {
    return (
      <div>
        {listNavigation.map((item) => {
          return (
            <div
              className="navigation-content__item"
              key={item.id}
              id={item.tab}
              onClick={(event: MouseEvent<HTMLElement>) => {
                navigateClick(event);
              }}
            >
              {item.tab}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="wrapper__nav-bar">
      <div className="grid">
        <div className="profile-header row">
          <img
            src={imageUrl}
            alt="Your Avatar"
            className="user-avatar col l-3"
          />
          <p className="user-name col l-6">{name}</p>
        </div>
      </div>

      <ListingOption />
      <div className="log-out" onClick={() => logOut()}>
        <div className="grid">
          <div className="row" style={{ justifyContent: "center" }}>
            <Link to={"/"} className="log-out_text col">
              Log out
            </Link>
            <i className="col">
              <FiLogOut className="log-out__icon" />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
