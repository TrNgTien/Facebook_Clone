import { getCookie } from "../../utils/CookieUtil";
import "./styles/ProfilePage.scss";
import Header from "../main-feeds/components/header/Header";
import { Avatar, AvatarGroup } from "@mui/material";
import { BsFillCameraFill } from "react-icons/bs";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import Upload from "../main-feeds/components/upload/Upload";
import BlankAvatar from "../../assets/avatar.png";
import PostImg from "../../assets/post_img.jpg";
import Post from "../main-feeds/components/post/Post";
import deepOrange from "@mui/material/colors";
export default function ProfilePage(props: any) {
  const BACKGROUND_IMG = 'https://image.tmdb.org/t/p/original/c6H7Z4u73ir3cIoCteuhJh7UCAR.jpg';
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
    <div className='profile-page'>
      <Header />
      <div className='profile-zone'>
        <div className='profile-zone__header'>
          <div className='container-cover-photo'>
            <img
              className='background-img'
              src={BACKGROUND_IMG}
              alt=''
            />
            <button className='add-cover'>
              <BsFillCameraFill className='add-cover-icon' />
              <p>Add Cover Photo</p>
            </button>
          </div>
          <div className='container-info'>
            <div className='container-info__left'>
              <div className='container-avatar'>
                <Avatar className='avatar-img' />
                <button className='add-avatar'>
                  <BsFillCameraFill className='add-avatar-icon' />
                </button>
              </div>
              <div className='container-side-info'>
                <div className='container-user-info'>
                  <h1 className='username'>Duong Phuc</h1>
                  <h4 className='friends-number'>176 friends</h4>
                  <AvatarGroup
                    max={7}
                    // sx={{ width: 30, height: 30 }}
                    // style={{ fontSize: "5px" }}
                    className='group-friends-avatar'
                  >
                    <Avatar className='friend-avatar' alt='Remy Sharp'>A</Avatar>
                    <Avatar className='friend-avatar' alt='Travis Howard' >B</Avatar>
                    <Avatar className='friend-avatar' alt='Cindy Baker' ></Avatar>
                    <Avatar className='friend-avatar' alt='Agnes Walker' >F</Avatar>
                    <Avatar className='friend-avatar' alt='Trevor Henderson'>E</Avatar>
                    <Avatar className='friend-avatar' alt='Remy Sharp' ></Avatar>
                    <Avatar className='friend-avatar' alt='Remy Sharp' >G</Avatar>
                  </AvatarGroup>
                </div>
              </div>
            </div>
            <div className='more-functions'>
              <button className='add-story'>
                <IoAddCircleSharp className='add-story-icon' />
                <p>Add to story</p>
              </button>
              <button className='edit-profile'>
                <FaPen className='edit-profile-icon' />
                <p>Edit profile</p>
              </button>
            </div>
          </div>
          <div className='container-hr-tag'>
            <hr className='hr-tag' />
          </div>
          <div className='profile-functionalities'>
            <div className='button-pages'>
              <button className='button-page posts'>Posts</button>
              <button className='button-page about'>About</button>
              <button className='button-page friends'>Friends</button>
              <button className='button-page photos'>Photos</button>
              <button className='button-page videos'>Videos</button>
              <button className='button-page check-ins'>Check-ins</button>
              <button className='button-page more'>More</button>
            </div>
            <button className='three-dots'>...</button>
          </div>
        </div>
        <div className='profile-zone__body'>
          <div className='profile-body__left'>
            <div className='container-intro'>
              <h3>Intro</h3>
              <button className='add-intro-btn'>Add Bio</button>
              <button className='add-intro-btn'>Edit details</button>
              <button className='add-intro-btn'>Add Hobbies</button>
              <button className='add-intro-btn'>Add Featured</button>
            </div>
            <div className='container-photos'>
              <div className='container-photos__header'>
                <h3>Photos</h3>
                <p className='see-all-photos'>See all photos</p>
              </div>
            </div>
            <div className='container-friends'>
              <div className='friends-tags'>
                <h3>Friends</h3>
                <p className='num-of-friend'>300 friends</p>
              </div>
              <p className='see-all-friends'>See all friends</p>
            </div>
          </div>
          <div className='profile-body__right'>
            <Upload />
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
    </div>
  );
}
