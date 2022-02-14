import React, { MouseEvent, FC } from "react";
import "./styles/NavigationBar.scss";
import { removeCookie } from "../../utils/CookieUtil";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
const NavigationBar = (props: any) => {
  const { imageUrl, name, history } = props;
  const listNavigation = ["Profile", "General Chat", "Question Matching"];
  const navigateClick = (event: any) => {
    const tabdNavigate = event.target.id;
    return tabdNavigate === "General Chat"
      ? history.push("/chatting")
      : tabdNavigate === "Question Matching"
      ? history.push("/chatting")
      : null;
  };
  const logOut = () => {
    removeCookie("userName");
    removeCookie("imageUrl");
    // history.push("/");
  };
  const ListingOption: FC = () => {
    return (
      <div className="navigation-content">
        {listNavigation.map((item, index) => {
          return (
            <div
              className="navigation-content__item"
              key={index}
              id={item}
              onClick={(event: MouseEvent<HTMLElement>) => navigateClick(event)}
            >
              {item}
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
          <img src={imageUrl} alt="" className="user-avatar col l-3" />
          <p className="user-name col l-6">{name}</p>
        </div>
      </div>

      <ListingOption />
      <div className="log-out" onClick={logOut}>
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
