import React from 'react'
import './Sidebar.scss'
import { IoStorefront } from 'react-icons/io5';
import { FaUserFriends } from 'react-icons/fa';
import { TiGroup } from 'react-icons/ti';
import { BsFillCollectionPlayFill, BsClockHistory } from 'react-icons/bs';
import { MdKeyboardArrowDown } from 'react-icons/md';



const Sidebar = (props: any) => {
    const { avatarURL, username} = props;
  return (
    <div className='sidebar'>
        <div className="sidebar-row sidebar-row--user">
            <img src={avatarURL} alt="avatar" />
            <h4>{username}</h4>
        </div>
        <div className="sidebar-row">
            <FaUserFriends className='sidebar-row__icon'/>
            <h4>Friends</h4>
        </div>
        <div className="sidebar-row">
            <TiGroup className='sidebar-row__icon'/>
            <h4>Groups</h4>
        </div>
        <div className="sidebar-row">
            <IoStorefront className='sidebar-row__icon'/>
            <h4>Marketplace</h4>
        </div>
        <div className="sidebar-row">
            <BsFillCollectionPlayFill className='sidebar-row__icon'/>
            <h4>Watch</h4>
        </div>
        <div className="sidebar-row">
            <BsClockHistory className='sidebar-row__icon'/>
            <h4>Memories</h4>
        </div>
        <div className="sidebar-row">
            <MdKeyboardArrowDown className='sidebar-row__icon sidebar-row__icon--more'/>
            <h4>See more</h4>
        </div>
    </div>
  )
}

export default Sidebar