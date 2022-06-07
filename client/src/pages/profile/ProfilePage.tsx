import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarGroup } from "@mui/material";
import { BsFillCameraFill } from "react-icons/bs";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@hooks/useStore";
import { useParams, useLocation } from "react-router-dom";
import { deletePost } from "@services/NewsFeedService";
import { MainLayout } from "@components/common/layout";
import { getOwnFriends, getPostById, getProfileID } from "@services/ProfileService";
import { setIsCreatePost, setListPosts } from "@slices/PostSlice";
import Upload from "../news-feed/components/upload/Upload";
import UploadPost from "@components/feat/upload-modal/UploadModal";
import Post from "@components/common/post/Posts";
import ViewPost from "@components/feat/view-post/ViewPost";
import { IUserData } from "@constants/InterfaceModel";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import { decodedID } from "@utils/DecodeToken";
import "./styles/ProfilePage.scss";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentUser } = useAppSelector((state) => state.auth);
  const { isCreatePost, listPosts, viewPostData } = useAppSelector((state) => state.post);
  const [ownPosts, setOwnPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { userID } = useParams<string>();
  const [userData, setUserData] = useState<IUserData>();
  const { pathname } = useLocation();
  const [ownID, setOwnID] = useState<string>();
  const profileRef = useRef<any>(null);
  const [friends, setFriends] = useState<Array<any>>([]);
  useEffect(() => {
    profileRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);
  useEffect(() => {
    getOwnFriends(currentUser?.token).then((res) => {
      if (res.status === 200) {
        setFriends(res.data.friends);
      }
    });
  }, [currentUser]);
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
  }, [pathname, userID, userData, currentUser]);
  useEffect(() => {
    if (currentUser) {
      setOwnID(decodedID(currentUser?.token));
    }
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
    };
    getOwnPosts();
  }, [dispatch, currentUser, userID]);
  const handleDeletePost = async (dataDeleteID: any) => {
    setIsLoading(true);
    const newListPosts = [...ownPosts];
    const resDelete = await deletePost(dataDeleteID, currentUser?.token);
    if (resDelete.status === 200) {
      const afterDeletePost = newListPosts.filter((post) => post._id !== dataDeleteID);
      dispatch(setListPosts(afterDeletePost));
      setOwnPosts(afterDeletePost);
      setIsLoading(false);
    }
  };
  const CustomButton = (): JSX.Element => {
    const ownerButtons = ["Add to story", "Edit profile"];
    const otherButtons = ["Add friend", "Message"];
    return (
      <div className='more-functions'>
        {currentUser && ownID === userData?._id
          ? ownerButtons.map((items, index) => {
              return (
                <button
                  key={index}
                  className={items === "Add to story" ? "add-story" : "edit-profile"}
                  onClick={() => {
                    items === "Add to story" ? console.log("s") : setOpenEdit(true);
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
            })
          : otherButtons.map((items, index) => {
              return (
                <button
                  key={index}
                  className={items === "Add friend" ? "add-story" : "edit-profile"}
                  onClick={() => {
                    items === "Add friend" ? console.log("s") : setOpenEdit(true);
                  }}
                >
                  {items === "Add friend" ? (
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
                  {userData && (
                    <img
                      src={userData?.userAvatar.url}
                      alt='avatar'
                      className='avatar-img'
                    />
                  )}
                  <button className='add-avatar'>
                    <BsFillCameraFill className='add-avatar-icon' />
                  </button>
                </div>
                <div className='container-side-info'>
                  <div className='container-user-info'>
                    <h1 className='username'>
                      {userData
                        ? userData?.firstName + " " + userData?.lastName
                        : "Loading..."}
                    </h1>
                    <h4 className='friends-number'>
                      {userData ? currentUser.friends.length : "Loading..."} friends
                    </h4>
                    {userData ? (
                      <div style={{ width: "fit-content" }}>
                        <AvatarGroup max={5} total={friends.length}>
                          {friends &&
                            friends.map((friend, index) => (
                              <Avatar
                                onClick={() => navigate(`/profile/${friend.userID}`)}
                                src={friend.avatar}
                                key={index}
                                alt=''
                                sx={{ width: 40, height: 40 }}
                              />
                            ))}
                        </AvatarGroup>
                      </div>
                    ) : (
                      <h2>Loading...</h2>
                    )}
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
                {currentUser.biography && (
                  <div className='bio-content'>{currentUser.biography}</div>
                )}
                <button className='add-intro-btn' onClick={() => setOpenEdit(true)}>
                  Add Bio
                </button>
                {/* <button className='add-intro-btn' onClick={() => setOpenEdit(true)}>
                  Edit details
                </button> */}
                <div className='hobbies-content'>
                  {currentUser.hobbies.map((hobby: string, index: any) => (
                    <div className='container-hobbies' key={index}>
                      <p className='hobby-tag-name'>{hobby}</p>
                    </div>
                  ))}
                </div>
                <button className='add-intro-btn' onClick={() => setOpenEdit(true)}>
                  Add Hobbies
                </button>
                <button className='add-intro-btn' onClick={() => setOpenEdit(true)}>
                  Add Featured
                </button>
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
                  <p className='num-of-friend'>{currentUser.friends.length} friends</p>
                </div>
                <p className='see-all-friends'>See all friends</p>
              </div>
            </div>
            <div className='profile-body__right'>
              {currentUser && ownID === userData?._id && <Upload />}
              {isLoading ? (
                <Post.PostLoading />
              ) : (
                ownPosts.map((post, index: number) => (
                  <Post
                    handleDeletePost={(dataDelete: any) => handleDeletePost(dataDelete)}
                    key={index}
                    postData={post}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {openEdit && <EditProfile currentUser={currentUser} setOpenEdit={setOpenEdit} />}
    </MainLayout>
  );
}
