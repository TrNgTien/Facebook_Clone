import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { RiVideoAddFill } from "react-icons/ri";
import { MdOutlineMoreHoriz } from "react-icons/md";
import "./styles/messagesList.scss";
import { AiOutlineSearch } from "react-icons/ai";

function MessagesList() {
  const messages = [
    {
      avatar:
        "https://banner2.cleanpng.com/20180904/vji/kisspng-avatar-image-computer-icons-likengo-usertesting-index-5b8ec1242fdcf5.6000571015360822121961.jpg",
      username: "Phuc Duong",
      latestMsg: "Hello minh la phuc day",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/194/194938.png",
      username: "Girl",
      latestMsg: "avatar, free user icons",
    },
    {
      avatar: "https://hinhnen123.com/wp-content/uploads/2021/06/avatar.jpg",
      username: "Thien Phuc",
      latestMsg: "Fresh 2022",
    },
    {
      avatar:
        "https://banner2.cleanpng.com/20180904/vji/kisspng-avatar-image-computer-icons-likengo-usertesting-index-5b8ec1242fdcf5.6000571015360822121961.jpg",
      username: "Phuc Duong",
      latestMsg: "Hello minh la phuc day",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/194/194938.png",
      username: "Girl",
      latestMsg: "avatar, free user icons",
    },
    {
      avatar: "https://hinhnen123.com/wp-content/uploads/2021/06/avatar.jpg",
      username: "Thien Phuc",
      latestMsg: "Fresh 2022",
    },
    {
      avatar:
        "https://banner2.cleanpng.com/20180904/vji/kisspng-avatar-image-computer-icons-likengo-usertesting-index-5b8ec1242fdcf5.6000571015360822121961.jpg",
      username: "Phuc Duong",
      latestMsg: "Hello minh la phuc day",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/194/194938.png",
      username: "Girl",
      latestMsg: "avatar, free user icons1",
    },
    {
      avatar: "https://hinhnen123.com/wp-content/uploads/2021/06/avatar.jpg",
      username: "Thien Phuc2",
      latestMsg: "Fresh 2022",
    },
    {
      avatar:
        "https://banner2.cleanpng.com/20180904/vji/kisspng-avatar-image-computer-icons-likengo-usertesting-index-5b8ec1242fdcf5.6000571015360822121961.jpg",
      username: "Phuc Duong2",
      latestMsg: "Hello minh la phuc day2",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/194/194938.png",
      username: "Girl",
      latestMsg: "avatar, free user icons2",
    },
    {
      avatar: "https://hinhnen123.com/wp-content/uploads/2021/06/avatar.jpg",
      username: "Thien Phuc2",
      latestMsg: "Fresh 2022",
    },
  ];
  return (
    <div className='list-message'>
      <div className='list-message__header'>
        <p className='list-message__title'>Chats</p>
        <div className='list-message__icons'>
          <div className='list-message__icon'>
            <MdOutlineMoreHoriz />
          </div>
          <div className='list-message__icon'>
            <RiVideoAddFill />
          </div>
          <div className='list-message__icon'>
            <BsPencilSquare />
          </div>
        </div>
      </div>
      <div className='list-message__search'>
        <AiOutlineSearch />
        <input
          className='list-message__search--input'
          type='text'
          placeholder='Search Messenger'
        />
      </div>
      <div className='list-message__chats'>
        {messages.map((item) => (
          <div className='list-message__chat'>
            <img className='chat-avatar' src={item.avatar} alt='' />
            <div className='right-side-container'>
              <p className='user-name'>{item.username}</p>
              <p className='latest-msg'>{item.latestMsg}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MessagesList;
