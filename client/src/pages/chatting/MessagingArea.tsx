import React, { useRef, useState } from "react";
import { AiOutlineGif } from "react-icons/ai";
import {
  BsFileImage,
  BsFillCameraVideoFill,
  BsFillEmojiSmileFill,
  BsStickyFill,
  BsTelephoneFill,
} from "react-icons/bs";
import { MdInfo, MdOutlineAddCircle, MdThumbUp } from "react-icons/md";
import { RiSendPlane2Fill } from "react-icons/ri";
import "./styles/messagingArea.scss";

const MessagingArea = () => {
  const [text, setText] = useState("");
  const scrollRef = useRef<null | HTMLDivElement>(null);

  const initMsgs = [
    {
      user: true,
      msg: "hey",
    },
    {
      user: "notme",
      msg: "It is a long established fact that a reader will be distracted by the readable content",
    },
    {
      user: "notme",
      msg: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    },
    {
      user: true,
      msg: "Where can I get some?",
    },
    {
      user: true,
      msg: "sometimes on purpose (injected humour and the like).",
    },
    {
      user: "notme",
      msg: "and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      user: true,
      msg: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
    },
    {
      user: true,
      msg: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    },
    {
      user: "notme",
      msg: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
    },
    {
      user: true,
      msg: " If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill.",
    },
  ];
  const [msgs, setMsgs] = useState(initMsgs);

  return (
    <div className='messaging-area'>
      <div className='messaging-area__header'>
        <div className='messaging-area__header--left'>
          <div className='container-avatar'>
            <img
              className='chat-avatar-img'
              src='https://cdn-icons-png.flaticon.com/512/194/194938.png'
              alt=''
            />
          </div>
          <p className='chat-username'>Phuc Duong</p>
        </div>
        <div className='messaging-area__header--right'>
          <div className='chatting-functional-icons'>
            <div className='chatting-functional-icon'>
              <BsTelephoneFill />
            </div>
            <div className='chatting-functional-icon'>
              <BsFillCameraVideoFill />
            </div>
            <div className='chatting-functional-icon'>
              <MdInfo />
            </div>
          </div>
        </div>
      </div>
      <div className='messaging-area__body'>
        {msgs.map((msg, index) => (
          <div className='message-container-line' key={index} ref={scrollRef}>
            <div
              className={
                msg.user === true
                  ? "container-msg container-msg--mine-msg"
                  : "container-msg container-msg--yours-msg"
              }
            >
              <p className='msg'>{msg.msg}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='messaging-area__footer'>
        <div className='input-functional-icons'>
          <div className='input-functional-icon'>
            <MdOutlineAddCircle />
          </div>
          <div className='input-functional-icon'>
            <BsFileImage />
          </div>
          <div className='input-functional-icon'>
            <BsStickyFill />
          </div>
          <div className='input-functional-icon'>
            <AiOutlineGif />
          </div>
        </div>
        <div className='input-message-and-emoji'>
          <input
            className='input-message'
            type='text'
            placeholder='Aa'
            onChange={(e) => setText(e.target.value)}
          />
          <div className='emoji'>
            <BsFillEmojiSmileFill />
          </div>
        </div>
        <div className='like-or-send-btn'>
          {true ? (
            <div className='like-chat-btn'>
              <MdThumbUp />
            </div>
          ) : (
            <div className='send-chat-btn'>
              <RiSendPlane2Fill />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingArea;
