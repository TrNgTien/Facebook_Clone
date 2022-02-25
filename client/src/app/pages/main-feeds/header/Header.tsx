import React from 'react'
import "./Header.scss";
import { AiOutlineSearch, AiTwotoneBell } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import { SiMessenger } from 'react-icons/si';
import { TiArrowSortedDown } from 'react-icons/ti';



const Header = (props: any ) => {
    const { avatarURL, username} = props;
  return (
    <div className='header'>
        <div className="header__left">
            <img src="http://www.clipartbest.com/cliparts/9Tp/bnA/9TpbnA7bc.png" alt="logo" />
            <div className="header__search">
                <input type="text" placeholder='Search...' />
                <AiOutlineSearch />
            </div>
        </div>
        <div className="header__right">
            <div className="header__user">
                <img className='avatar' src={avatarURL} alt="avatar" />
                <h4>{username}</h4>
            </div>
            <div className="header__option header__option--add">
                <GrAdd />
            </div>
            <div className="header__option header__option--message">
                <SiMessenger />
                <div className="counter">100</div>
            </div>
            <div className="header__option header__option--notification">
                <AiTwotoneBell />
                <div className="counter">10</div>
            </div>
            <div className="header__option--menu header__option ">
                <TiArrowSortedDown />
            </div>
        </div>
    </div>
  )
}

export default Header