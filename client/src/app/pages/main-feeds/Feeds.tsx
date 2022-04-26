import React from "react";
import Header from "./components/header/Header";
import Post from "./components/post/Post";
import Sidebar from "./components/sidebar/Sidebar";
import Upload from "./components/upload/Upload";
import "./styles/Feeds.scss";
import BlankAvatar from "../../assets/avatar.png";
import PostImg from "../../assets/post_img.jpg";

export default function Feeds() {
  const userNameCookie = "User Name";
  const imageUrlCookie = BlankAvatar;
  const IMG_URL1 = PostImg;
  const IMG_URL2 =
    "https://media.istockphoto.com/photos/freedom-chains-that-transform-into-birds-charge-concept-picture-id1322104312?b=1&k=20&m=1322104312&s=170667a&w=0&h=VQyPkFkMKmo0e4ixjhiOLjiRs_ZiyKR_4SAsagQQdkk=";
  const content =
    "So after I did step 1.1|2 it was not working, then I found the above issue/solution.";
  const current_date = new Date().toDateString().toString();

  const posts = [
    {
      id: 0,
      avatarURL: imageUrlCookie,
      username: userNameCookie,
      timestamp: current_date,
      content: content,
      imgURL: IMG_URL1,
    },
    {
      id: 1,
      avatarURL: imageUrlCookie,
      username: userNameCookie,
      timestamp: current_date,
      content: content,
      imgURL: IMG_URL2,
    },
    {
      id: 2,
      avatarURL: imageUrlCookie,
      username: userNameCookie,
      timestamp: current_date,
      content: content,
      imgURL: IMG_URL1,
    },
  ];
  return (
    <div className='feeds-container'>
      <Header avatarURL={imageUrlCookie} username={userNameCookie} />
      <div className='body-container'>
        <Sidebar avatarURL={imageUrlCookie} username={userNameCookie} />
        <div className='body-feeds'>
          <Upload avatarURL={imageUrlCookie} username={userNameCookie} />
          {posts.map((post, index) => (
            <Post
              key={index}
              avatarURL={post.avatarURL}
              username={post.username}
              timestamp={post.timestamp}
              content={post.content}
              imgURL={post.imgURL}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
