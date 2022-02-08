import React, { useState } from "react";
import NavigationBar from "../../components/sidebar-navigation/NavigationBar";
import "./styles/GeneralChat.scss";
const GeneralChat = () => {
  // const [avatarImg, setAvatarImg] = useState<number>(0);
  return (
    <div className="general-chat__wapper">
      <NavigationBar/>
    </div>
  );
};

export default GeneralChat;
