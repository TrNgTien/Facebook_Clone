import React, { useState, useEffect } from "react";
import "./styles/messagesPage.scss";
import { MainLayout } from "@components/common/layout/index";
import MessagesList from "./MessagesList";
import MessagingArea from "./MessagingArea";
import UserInfoSide from "./UserInfoSide";
import { io } from "socket.io-client";

const MessagesPage = () => {
  return (
    <MainLayout>
      <div className='messages-page__wrapper'>
        <MessagesList />
        <MessagingArea />
        <UserInfoSide />
      </div>
    </MainLayout>
  );
};

export default MessagesPage;
