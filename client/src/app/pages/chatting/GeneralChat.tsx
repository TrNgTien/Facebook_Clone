import React from "react";
import NavigationBar from "../../components/sidebar-navigation/NavigationBar";
import "./styles/GeneralChat.scss";
import { getCookie } from "../../utils/CookieUtil";

const GeneralChat = (props: any) => {
  const userNameCookie = getCookie("userName");
  const imageUrlCookie = getCookie("imageUrl");
  return (
    <div className="general-chat__wapper">
      <NavigationBar
        imageUrl={imageUrlCookie}
        name={userNameCookie}
        history={props.history}
      />
      <div className="general-zone">
        <h2>General Chat</h2>
      </div>
    </div>
  );
};

export default GeneralChat;
