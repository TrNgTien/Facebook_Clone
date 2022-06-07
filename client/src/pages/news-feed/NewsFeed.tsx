import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MainLayout } from "@components/common/layout/index";
import Post from "@components/common/post/Posts";
import { getAllFeed } from "@services/NewsFeedService";
import Sidebar from "./components/sidebar/Sidebar";
import Upload from "./components/upload/Upload";
import UploadPost from "@components/feat/upload-modal/UploadModal";
import { useAppSelector, useAppDispatch } from "@hooks/useStore";
import { setIsCreatePost, setListPosts } from "@slices/PostSlice";
import ViewPost from "@components/feat/view-post/ViewPost";
import { getLocalStorage } from "@utils/LocalStorageUtil";
import { deletePost } from "@services/NewsFeedService";
import { getAllUser } from "@services/FriendsService";
import { useNavigate } from "react-router-dom";
import "./styles/NewsFeed.scss";

export default function NewsFeed() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const listInnerRef = useRef<HTMLDivElement>(null);
  const { isCreatePost, viewPostData, listPosts } = useAppSelector((state) => state.post);
  const { currentUser } = useAppSelector((state) => state.auth);
  const [postData, setPostData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [friends, setFriends] = useState<Array<any>>([]);

  useEffect(() => {
    getAllUser(currentUser.token).then((res) => {
      if (res.status === 200) {
        const listUser: Array<any> = res.data.data;

        setFriends([
          ...listUser.filter((item) => currentUser.friends.indexOf(item._id) >= 0),
        ]);
      }
    });
  }, [currentUser]);
  useEffect(() => {
    dispatch(setIsCreatePost(false));
    setPostData(listPosts);
  }, [dispatch, listPosts]);
  useEffect(() => {
    const userToken = getLocalStorage("token");
    const getPostData = async () => {
      setIsLoading(true);
      const dataPost = await getAllFeed(userToken);
      if (dataPost.status === 200) {
        const sortedData = dataPost.data.dataPost.sort((a: any, b: any) => {
          return new Date(b.time).valueOf() - new Date(a.time).valueOf();
        });
        dispatch(setListPosts(sortedData));
        setPostData(sortedData);
        setIsLoading(false);
      }
    };
    getPostData();
  }, [dispatch]);
  const handleDeletePost = async (dataDeleteID: any) => {
    const newListPosts = [...postData];
    const resDelete = await deletePost(dataDeleteID, currentUser.token);
    if (resDelete.status === 200) {
      const afterDeletePost = newListPosts.filter((post) => post._id !== dataDeleteID);
      dispatch(setListPosts(afterDeletePost));
      setPostData(afterDeletePost);
    }
  };
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        console.log("reached bottom");
      }
    }
  };

  return (
    <MainLayout>
      <div className='feeds-container'>
        <div className='body-container'>
          {isCreatePost && <UploadPost />}
          {viewPostData.isViewPost && <ViewPost />}
          <Sidebar />
          <div className='body-feeds' onScroll={onScroll} ref={listInnerRef}>
            {currentUser && <Upload />}
            {isLoading && currentUser ? (
              <Post.PostLoading />
            ) : (
              postData.map((post, index: number) => (
                <Post
                  key={index}
                  handleDeletePost={(dataDelete: any) => handleDeletePost(dataDelete)}
                  postData={post}
                />
              ))
            )}
          </div>
          <div className='list-friends'>
            <div className='list-friends__header'>
              <p>Contacts</p>
              <div className='list-friends__funtion-btn'>
                <AiOutlineSearch />
              </div>
            </div>
            {friends.map((friend: any, index: any) => (
              <div
                className='list-friends__body-item'
                key={index}
                onClick={() => navigate(`/profile/${friend._id}`)}
              >
                <div className='wrapper-avatar'>
                  <img src={friend.userAvatar.url} alt='avatar' className='avatar-friend' />
                  {/* <p className='active-point'>&nbsp;</p> */}
                </div>
                <p>{friend.firstName + " " + friend.lastName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
