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
        <div className="sidebar-row">
            <img className='sidebar-row-user-img' src={avatarURL} alt="avatar" />
            <h4>{username}</h4>
        </div>
        <div className="sidebar-row">
            <i><FaUserFriends className='sidebar-row__icon'/></i>
            <h4>Friends</h4>
        </div>
        <div className="sidebar-row">
            <i><TiGroup className='sidebar-row__icon'/></i>
            <h4>Groups</h4>
        </div>
        <div className="sidebar-row">
            <i><IoStorefront className='sidebar-row__icon'/></i>
            <h4>Marketplace</h4>
        </div>
        <div className="sidebar-row">
            <i><BsFillCollectionPlayFill className='sidebar-row__icon'/></i>
            <h4>Watch</h4>
        </div>
        <div className="sidebar-row">
            <i><BsClockHistory className='sidebar-row__icon'/></i>
            <h4>Memories</h4>
        </div>
        <div className="sidebar-row">
            <i><MdKeyboardArrowDown className='sidebar-row__icon sidebar-row__icon--more'/></i>
            <h4>See more</h4>
        </div>
    </div>
  )
}

export default Sidebar