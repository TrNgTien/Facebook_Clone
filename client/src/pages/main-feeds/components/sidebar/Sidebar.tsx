import React from "react";
import "./Sidebar.scss";
import { MdKeyboardArrowDown } from "react-icons/md";
import ImageIcons from "@theme/ImageIcons";
import { useAppSelector } from "@store/hooks";

const Sidebar = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  return (
    <div className='sidebar'>
      <div className='sidebar-row'>
        <img className='sidebar-row-user-img' src={currentUser.userAvatar} alt='avatar' />
        <p>{currentUser.fullName}</p>
      </div>
      <div className='sidebar-row'>
        <img src={ImageIcons.FRIEND_IC} alt='friends' />
        <p>Friends</p>
      </div>
      <div className='sidebar-row'>
        <img src={ImageIcons.GROUP_IC} alt='gr' />
        <p>Groups</p>
      </div>
      <div className='sidebar-row'>
        <img src={ImageIcons.MARKET_IC} alt='market' />
        <p>Marketplace</p>
      </div>
      <div className='sidebar-row'>
        <img src={ImageIcons.WATCH_IC} alt='watch' />
        <p>Watch</p>
      </div>
      <div className='sidebar-row'>
        <img src={ImageIcons.MEMORIES_IC} alt='mem' />
        <p>Memories</p>
      </div>
      <div className='sidebar-row'>
        <MdKeyboardArrowDown className='sidebar-row__icon sidebar-row__icon--more' />
        {/* <img src='https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/AYj2837MmgX.png' alt='mem' /> */}

        <p>See more</p>
      </div>
    </div>
  );
};

export default Sidebar;
