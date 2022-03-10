import React, { useState } from "react";
import { AiOutlineSearch, AiTwotoneBell } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { TiArrowSortedDown } from "react-icons/ti";
import logo from "../../../../assets/icons8-facebook.svg";
import "./Header.scss";

const Header = (props: any) => {
  const { avatarURL, username } = props;
  const [counterNoti, setCounterNoti] = useState<Number>(12);
  return (
    <div className="header">
      <div className="header__left">
        <img
          src={logo}
          alt="logo"
        />
        <div className="header__search">
          <input type="text" placeholder="Search..." />
          <i>
            <AiOutlineSearch />
          </i>
        </div>
      </div>
      <div className="header__right">
        <div className="header__user">
          <img className="img-avatar" src={avatarURL} alt="avatar" />
          <h4>{username}</h4>
        </div>
        <div className="header__option header__option--add">
          <i>
            <GrAdd />
          </i>
        </div>
        <div className="header__option header__option--notification">
          <i>
            <AiTwotoneBell />
          </i>
          <div className="notify-counter">{counterNoti > 9 ? "9+" : counterNoti}</div>
        </div>
        <div className="header__option--menu header__option ">
          <i>
            <TiArrowSortedDown />
          </i>
        </div>
      </div>
    </div>
  );
};

export default Header;
