import React from "react";
import "./Sidebar.scss";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAppSelector } from "@hooks/useStore";
import { useNavigate } from "react-router-dom";
import Icons from "@theme/Icons";
import { decodedID } from "@utils/DecodeToken";
const Sidebar = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const ownID = decodedID(currentUser.token);
  return (
    <div className='sidebar'>
      <div className='sidebar-row' onClick={() => navigate(`/profile/${ownID}`)}>
        <img src={currentUser.userAvatar.url} alt='avatar' />
        <p>{currentUser.fullName}</p>
      </div>
      <div className='sidebar-row' onClick={() => navigate("/friend")}>
        <img src={Icons.FRIEND_IC} alt='friends' />
        <p>Friends</p>
      </div>
      <div className='sidebar-row'>
        <img src={Icons.GROUP_IC} alt='gr' />
        <p>Groups</p>
      </div>
      <div className='sidebar-row'>
        <img src={Icons.MARKET_IC} alt='market' />
        <p>Marketplace</p>
      </div>
      <div className='sidebar-row'>
        <img src={Icons.WATCH_IC} alt='watch' />
        <p>Watch</p>
      </div>
      <div className='sidebar-row'>
        <img src={Icons.MEMORIES_IC} alt='mem' />
        <p>Memories</p>
      </div>
      <div className='sidebar-row'>
        <MdKeyboardArrowDown className='sidebar-row__icon sidebar-row__icon--more' />
        <p>See more</p>
      </div>
    </div>
  );
};

export default Sidebar;
