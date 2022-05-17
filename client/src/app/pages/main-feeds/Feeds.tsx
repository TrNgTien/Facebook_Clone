import React, { useEffect, useRef, useState } from "react";
import Header from "./components/header/Header";
import Post from "./components/post/Post";
import Sidebar from "./components/sidebar/Sidebar";
import Upload from "./components/upload/Upload";
import "./styles/Feeds.scss";
import PostImg from "../../assets/post_img.jpg";
import jwt_decode from "jwt-decode";
import { IJwtDecode } from "../../constants/InterfaceModel";
import { ReqUserById } from "../../services/AuthService";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { GetAllFeed } from "../../services/FeedsService";

export default function Feeds() {
  const dispatch = useDispatch();
  const userSlice = useAppSelector((state) => state.auth.currentUser);
  const postsSlice = useAppSelector((state) => state.post.posts);
  const userNameCookie = "User Name";
  const IMG_URL1 = PostImg;
  const IMG_URL2 =
    "https://media.istockphoto.com/photos/freedom-chains-that-transform-into-birds-charge-concept-picture-id1322104312?b=1&k=20&m=1322104312&s=170667a&w=0&h=VQyPkFkMKmo0e4ixjhiOLjiRs_ZiyKR_4SAsagQQdkk=";
  const content =
    "So after I did step 1.1|2 it was not working, then I found the above issue/solution.";
  const current_date = new Date().toDateString().toString();

  const token = localStorage.getItem("token") || "";
  const token_decoded = jwt_decode<IJwtDecode>(token);
  const listInnerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const userData = ReqUserById(token_decoded.id, dispatch);
    const posts = GetAllFeed(dispatch);
    console.log("slice post: ", postsSlice);
  }, []);
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        console.log("reached bottom");
      }
    }
  };
  const posts = [
    {
      id: 0,
      avatarURL: userSlice?.userAvatar,
      username: userNameCookie,
      timestamp: current_date,
      content: content,
      imgURL: IMG_URL1,
    },
    {
      id: 1,
      avatarURL: userSlice?.userAvatar,
      username: userNameCookie,
      timestamp: current_date,
      content: content,
      imgURL: IMG_URL2,
    },
    {
      id: 2,
      avatarURL: userSlice?.userAvatar,
      username: userNameCookie,
      timestamp: current_date,
      content: content,
      imgURL: IMG_URL1,
    },
  ];
  return (
    <div className='feeds-container'>
      <Header
        avatarURL={userSlice?.userAvatar}
        username={userSlice?.firstName + " " + userSlice?.lastName}
      />
      <div className='body-container'>
        <Sidebar
          avatarURL={userSlice?.userAvatar}
          username={userSlice?.firstName + " " + userSlice?.lastName}
        />
        <div className='body-feeds' onScroll={() => onScroll()} ref={listInnerRef}>
          <Upload
            avatarURL={userSlice?.userAvatar}
            username={userSlice?.firstName + " " + userSlice?.lastName}
          />
          {postsSlice.map((post, index) => (
            <Post
              key={index}
              avatarURL={userSlice?.userAvatar}
              username={userSlice?.firstName + " " + userSlice?.lastName}
              timestamp={post.time}
              content={post.description}
              imgURL={post.feedAttachments}
              numOfLike={post.numberOfLike}
              numOfCom={post.numberOfComment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
