import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarGroup } from "@mui/material";
import { BsFillCameraFill } from "react-icons/bs";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@hooks/useStore";
import { useParams, useLocation } from "react-router-dom";

import { MainLayout } from "@components/common/layout";
import { getPostById, getProfileID } from "@services/ProfileService";
import { setIsCreatePost, setListPosts } from "@slices/PostSlice";
import Upload from "../news-feed/components/upload/Upload";
import UploadPost from "@components/feat/upload-modal/UploadModal";
import Post from "@components/common/post/Posts";
import ViewPost from "@components/feat/view-post/ViewPost";
import { IJwtDecode, IUserData } from "@constants/InterfaceModel";
import "./styles/ProfilePage.scss";
import EditProfile from "./EditProfile";
import jwtDecode from "jwt-decode";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { isCreatePost, listPosts, viewPostData } = useAppSelector((state) => state.post);
  const [ownPosts, setOwnPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const { userID } = useParams<string>();
  const [userData, setUserData] = useState<IUserData>();
  const { pathname } = useLocation();
  const profileRef = useRef<any>(null);
  useEffect(() => {
    const currentUserIdDecoded = jwtDecode<IJwtDecode>(currentUser.token).id;
    setCurrentUserId(currentUserIdDecoded);
    profileRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);
  useEffect(() => {
    dispatch(setIsCreatePost(false));
    if (listPosts) {
      setOwnPosts(listPosts);
    }
  }, [dispatch, listPosts]);

  useEffect(() => {
    if (pathname === `/profile/${userData?._id}`) {
      document.title = `${userData?.firstName + " " + userData?.lastName} | Facebook Clone`;
    } else {
      document.title = `Facebook Clone`;
    }
  }, [pathname, userID, userData]);
  useEffect(() => {
    const getOwnPosts = async () => {
      setIsLoading(true);
      const resProfile = await getProfileID(userID);
      if (resProfile.status === 200) {
        setUserData(resProfile.data.data);
      }
      const resPosts = await getPostById(userID);
      if (resPosts.status === 200) {
        const sortedData = resPosts.data.dataPost.sort((a: any, b: any) => {
          return new Date(b.time).valueOf() - new Date(a.time).valueOf();
        });
        dispatch(setListPosts(sortedData));
        setOwnPosts(sortedData);
        setIsLoading(false);
      }
      console.log("userId: ", userID);
    };
    getOwnPosts();
  }, [dispatch, currentUser, userID]);
  const CustomButton = (): JSX.Element => {
    const ownerButtons = ["Add to story", "Edit profile"];
    const otherButtons = ["Add friend", "Message"];
    return (
      <div className='more-functions'>
        {currentUserId === userData?._id &&
          ownerButtons.map((items, index) => {
            return (
              <button
                key={index}
                className={items === "Add to story" ? "add-story" : "edit-profile"}
                onClick={() => {
                  items === "Add to story" ? console.log("s") : console.log("2");
                }}
              >
                {items === "Add to story" ? (
                  <>
                    <IoAddCircleSharp className='add-story-icon' />
                    <p>{items}</p>
                  </>
                ) : (
                  <>
                    <FaPen className='edit-profile-icon' />
                    <p>{items}</p>
                  </>
                )}
              </button>
            );
          })}
      </div>
    );
  };
  const CustomFunctionList = (): JSX.Element => {
    const titleList = [
      "Posts",
      "About",
      "Friends",
      "Photos",
      "Videos",
      "Check-ins",
      "More",
    ];

    return (
      <div className='button-pages'>
        {titleList.map((items, index) => {
          return (
            <button key={index} className='button-page'>
              {items}
            </button>
          );
        })}
      </div>
    );
  };
  return (
    <MainLayout>
      {isCreatePost && currentUser && <UploadPost />}
      <div className='profile-page' ref={profileRef}>
        <div className='profile-zone'>
          {viewPostData.isViewPost && <ViewPost />}
          <div className='profile-zone__header'>
            <div className='container-cover-photo'>
              <img className='background-img' src={userData?.userCover.url} alt='' />
              <button className='add-cover'>
                <BsFillCameraFill className='add-cover-icon' />
                <p>Edit Cover Photo</p>
              </button>
            </div>
            <div className='container-info'>
              <div className='container-info__left'>
                <div className='container-avatar'>
                  <img src={userData?.userAvatar.url} alt='avatar' className='avatar-img' />
                  <button className='add-avatar'>
                    <BsFillCameraFill className='add-avatar-icon' />
                  </button>
                </div>
                <div className='container-side-info'>
                  <div className='container-user-info'>
                    <h1 className='username'>
                      {userData?.firstName + " " + userData?.lastName}
                    </h1>
                    <h4 className='friends-number'>176 friends</h4>
                    <div style={{ width: "fit-content" }}>
                      <AvatarGroup max={5} total={175}>
                        <Avatar
                          src={userData?.userAvatar.url}
                          alt='friend avatar'
                          sx={{ width: 40, height: 40 }}
                        />
                        <Avatar
                          src={userData?.userAvatar.url}
                          alt='friend avatar'
                          sx={{ width: 40, height: 40 }}
                        />
                        <Avatar alt='friend avatar' sx={{ width: 40, height: 40 }}>
                          B
                        </Avatar>
                        <Avatar alt='friend avatar' sx={{ width: 40, height: 40 }}>
                          F
                        </Avatar>
                        <Avatar alt='friend avatar' sx={{ width: 40, height: 40 }}>
                          F
                        </Avatar>
                        <Avatar alt='friend avatar' sx={{ width: 40, height: 40 }}>
                          E
                        </Avatar>
                        <Avatar alt='friend avatar' sx={{ width: 40, height: 40 }}>
                          F
                        </Avatar>
                        <Avatar alt='friend avatar' sx={{ width: 40, height: 40 }}>
                          F
                        </Avatar>
                      </AvatarGroup>
                    </div>
                  </div>
                </div>
              </div>
              <CustomButton />
            </div>
            <div className='profile-functionalities'>
              <CustomFunctionList />
              <button onClick={() => console.log("hi")} className='three-dots'>
                ...
              </button>
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
              {currentUserId === userData?._id && <Upload />}
              {isLoading ? (
                <Post.PostLoading />
              ) : (
                ownPosts.map((post, index: number) => <Post key={index} postData={post} />)
              )}
            </div>
          </div>
        </div>
      </div>
      {true && <EditProfile currentUser={undefined} />}
    </MainLayout>
  );
}
