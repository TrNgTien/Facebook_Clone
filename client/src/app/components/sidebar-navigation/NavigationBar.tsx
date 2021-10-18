import React from "react";
import { Link } from "react-router-dom";
import "./styles/NavigationBar.scss";
const NavigationBar = (props: any) => {
  const { imageUrl, name, history } = props;
  const listNavigation = ["Profile", "General Chat", "Question Matching"];
  const navigateClick = (event: any) => {
    const tabdNavigate = event.target.id;
    if (tabdNavigate === "General Chat") {
      history.push("/chatting");
    } else if (tabdNavigate === "Question Matching") {
      history.push("/chatting");
    } else {
      // history.push("/profile");
    }
  };
  const listingOption = () => {
    return (
      <div className="navigation-content">
        {listNavigation.map((item, index) => {
          return (
            <div
              className="navigation-content__item"
              key={index}
              id={item}
              onClick={(event: React.MouseEvent<HTMLElement>) =>
                navigateClick(event)
              }
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="wrapper__nav-bar row">
      <div className="profile-header row">
        <img src={imageUrl} alt="avatar image" className="user-avatar" />
        <p className="user-name">{name}</p>
      </div>
      {listingOption()}
    </div>
  );
};

export default NavigationBar;
