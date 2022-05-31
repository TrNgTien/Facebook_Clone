import React from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import "./styles/userInfoSide.scss";

const UserInfoSide = () => {
  const functionalities_name = [
    "Customize chat",
    "Media, files and links",
    "Privacy & support"
  ]
  return(
    <div className='user-info-side'>
      <div className="user-info-side__header">
        <div className="user-info-side__avatar">
          <img className="container-img" src="https://cdn-icons-png.flaticon.com/512/194/194938.png" alt="" />
        </div>
        <div className="container-user-chat-name">
        <p className="user-chat-name">Duong Thien Phuc </p>
        </div>
      </div>
      <div className="user-info-side__functionalities">
        {functionalities_name.map((item, index) => 
            <div className="functionality" key={index}>
              <p className="functionality-name">{item}</p>
              <RiArrowDownSLine/>
            </div>  
          )
        }
      </div>
    </div>
  );
};

export default UserInfoSide;
