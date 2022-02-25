import React from "react";
import Header from './header/Header';
import Post from './post/Post';
import Sidebar from "./sidebar/Sidebar";
import Upload from "./upload/Upload";
import { getCookie } from "../../utils/CookieUtil";
import './Feeds.scss';


export default function Feeds() {
  const userNameCookie = getCookie("userName");
  const imageUrlCookie = getCookie("imageUrl");
  return (
  <div className="feeds">
    <Header avatarURL={imageUrlCookie} username={userNameCookie} />
      <div className="body">
        <Sidebar avatarURL={imageUrlCookie} username={userNameCookie}/>
        <div className="body__feeds">
          <Upload avatarURL={imageUrlCookie} username={userNameCookie}/>
          <Post 
            avatarURL={imageUrlCookie}
            username={userNameCookie}
            timestamp='timestamp' 
            content='So after I did step 1.1|2 it was not working, then I found the above issue/solution.' 
            imgURL='https://picjumbo.com/wp-content/uploads/woman-holding-an-american-flag-in-a-field-free-photo-1080x1620.jpg'
            />
          <Post 
            avatarURL={imageUrlCookie}
            username={userNameCookie} 
            timestamp='timestamp' 
            content='So after I did step 1.1|2 it was not working, then I found the above issue/solution.' 
            imgURL='https://media.istockphoto.com/photos/freedom-chains-that-transform-into-birds-charge-concept-picture-id1322104312?b=1&k=20&m=1322104312&s=170667a&w=0&h=VQyPkFkMKmo0e4ixjhiOLjiRs_ZiyKR_4SAsagQQdkk='
            />
            <Post 
            avatarURL={imageUrlCookie}
            username={userNameCookie} 
            timestamp='timestamp' 
            content='So after I did step 1.1|2 it was not working, then I found the above issue/solution.' 
            imgURL='https://media.istockphoto.com/photos/freedom-chains-that-transform-into-birds-charge-concept-picture-id1322104312?b=1&k=20&m=1322104312&s=170667a&w=0&h=VQyPkFkMKmo0e4ixjhiOLjiRs_ZiyKR_4SAsagQQdkk='
            />
            <Post 
            avatarURL={imageUrlCookie}
            username={userNameCookie} 
            timestamp='timestamp' 
            content='So after I did step 1.1|2 it was not working, then I found the above issue/solution.' 
            imgURL='https://media.istockphoto.com/photos/freedom-chains-that-transform-into-birds-charge-concept-picture-id1322104312?b=1&k=20&m=1322104312&s=170667a&w=0&h=VQyPkFkMKmo0e4ixjhiOLjiRs_ZiyKR_4SAsagQQdkk='
            />
        </div>
      </div>
  </div>
  );
}
