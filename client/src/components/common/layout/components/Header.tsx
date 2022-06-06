import React, { memo, useState, useEffect, useRef } from "react";
import { AiOutlineSearch, AiTwotoneBell } from "react-icons/ai";
import { FaFacebookMessenger } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { TiArrowSortedDown } from "react-icons/ti";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FacebookLogo from "@assets/icons/icons8-facebook.svg";
import "./Header.scss";
import { useAppSelector } from "@hooks/useStore";
import jwtDecode from "jwt-decode";
import { IJwtDecode } from "@constants/InterfaceModel";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setLogout } from "@slices/AuthenSlice";
import { deleteLocalStorage } from "@utils/LocalStorageUtil";
import useClickOutSide from "@hooks/useClickOutSide";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const isClickOutSide = useClickOutSide(headerRef);
  const [counterNoti] = useState<Number>(12);
  const [searchText, setSearchText] = useState<string>("");
  const [onwIdUser, setOnwIdUser] = useState<string>("");
  const { currentUser } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  const { userID } = useParams();
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const onwID = jwtDecode<IJwtDecode>(currentUser.token).id;
      setOnwIdUser(onwID);
      if (pathname === `/profile/${onwID}`) {
        document.title = `${currentUser?.fullName} | Facebook Clone`;
      } else {
        document.title = `Facebook Clone`;
      }
    }
  }, [pathname, userID, currentUser]);

  const handleLogout = () => {
    console.log("click");

    dispatch(setLogout());
    deleteLocalStorage("token");
    deleteLocalStorage("refreshToken");
  };

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
        {currentUser && (
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
        )}
      </div>
      {currentUser && (
        <div className='header__right'>
          <div
            className={
              pathname === `/profile/${onwIdUser}`
                ? "header__wrapper-user--highlighted"
                : "header__wrapper-user"
            }
            onClick={() => navigate(`/profile/${onwIdUser}`)}
          >
            <img className='img-avatar' src={currentUser.userAvatar.url} alt='avatar' />
            <p className='header__user-name'>{currentUser.fullName}</p>
          </div>
          <div className='header__option'>
            <GrAdd className='icon-options' />
          </div>
          <div className='header__option' onClick={() => navigate("/messenger")}>
            <FaFacebookMessenger className='icon-options' />
          </div>
          <div className='header__option'>
            <AiTwotoneBell className='icon-options' />
            <div className='notify-counter'>{counterNoti > 9 ? "9+" : counterNoti}</div>
          </div>
          <div
            className='header__option'
            ref={headerRef}
            onClick={() => setOpenDropdown((prev) => !prev)}
          >
            <TiArrowSortedDown className='icon-options' />
          </div>
          {!isClickOutSide && openDropdown && (
            <div className='dropdown-window'>
              <div className='user-functional-button'>
                <div className='user-functional__icons' onClick={() => handleLogout()}>
                  <div className='user-functional__icon-container'>
                    <MdLogout />
                  </div>
                  <p className='user-functional__tag'>Log Out</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default memo(Header);
