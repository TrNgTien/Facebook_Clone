import React from 'react'
import "./header.scss";
import { AiOutlineSearch, AiTwotoneBell } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import { SiMessenger } from 'react-icons/si';
import { TiArrowSortedDown } from 'react-icons/ti';



const Header = () => {
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
                <img className='logo' src="http://www.clipartbest.com/cliparts/nTE/BGx/nTEBGxgzc.jpg" alt="avatar" />
                <h4>Tran Ngoc Tien</h4>
            </div>
            <div className="header__option header__option--add">
                <GrAdd />
            </div>
            <div className="header__option header__option--message">
                <SiMessenger />
            </div>
            <div className="header__option header__option--notification">
                <AiTwotoneBell />
            </div>
            <div className="header__option header__option--menu">
                <TiArrowSortedDown />
            </div>
        </div>
    </div>
  )
}

export default Header