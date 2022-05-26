import React, { memo, useState } from "react";
import { AiOutlineSearch, AiTwotoneBell } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { TiArrowSortedDown } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import FacebookLogo from "@assets/icons8-facebook.svg";
import "./Header.scss";
import { useAppSelector } from "@store/hooks";

const Header = (props: any) => {
  const navigate = useNavigate();
  const [counterNoti, setCounterNoti] = useState<Number>(12);
  const [searchText, setSearchText] = useState<string>("");
  const { currentUser } = useAppSelector((state) => state.auth);
  const location = useLocation();

  return (
    <nav className='header'>
      <div className='header__left'>
        <img
          className='logo_img'
          src={FacebookLogo}
          alt='logo'
          onClick={() => {
            navigate("/feeds");
          }}
        />
        <form className='header__search'>
          <label htmlFor='input-search' style={{ cursor: "pointer" }}>
            <AiOutlineSearch
              className={searchText.length > 0 ? "icon_search__hidden" : "icon_search"}
            />
          </label>
          <input
            type='text'
            id='input-search'
            className='header__input'
            placeholder='Search...'
            autoComplete='off'
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </form>
      </div>
      <div className='header__right'>
        <div
          className={
            location.pathname === "/profile"
              ? "header__wrapper-user--highlighted"
              : "header__wrapper-user"
          }
          onClick={() => navigate("/profile")}
        >
          <img className={"img-avatar"} src={currentUser.userAvatar} alt='avatar' />
          <p className="header__user-name">{currentUser.fullName}</p>
        </div>
        <div className='header__option'>
          <GrAdd className='icon-options' />
        </div>
        <div className='header__option'>
          <AiTwotoneBell className='icon-options' />
          <div className='notify-counter'>{counterNoti > 9 ? "9+" : counterNoti}</div>
        </div>
        <div className='header__option'>
          <TiArrowSortedDown className='icon-options' />
        </div>
      </div>
    </nav>
  );
};

export default memo(Header);
