import React, { FC, useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MainLayout } from "@components/common/layout/index";
import Post from "@components/common/post/Posts";
import { getAllFeed } from "@services/NewsFeedService";
import Sidebar from "./components/sidebar/Sidebar";
import Upload from "./components/upload/Upload";
import UploadPost from "@components/feat/upload-modal/UploadModal";
import { useAppSelector, useAppDispatch } from "@hooks/useStore";
import { setIsCreatePost, setListPosts, setDeletePost } from "@slices/PostSlice";
import ViewPost from "@components/feat/view-post/ViewPost";
import { getLocalStorage } from "@utils/LocalStorageUtil";
import { deletePost } from "@services/NewsFeedService";

import "./styles/NewsFeed.scss";
import { getProfileID } from "@services/ProfileService";

export default function NewsFeed() {
  const dispatch = useAppDispatch();
  const listInnerRef = useRef<HTMLDivElement>(null);
  const { isCreatePost, viewPostData, listPosts } = useAppSelector((state) => state.post);
  const { currentUser } = useAppSelector((state) => state.auth);
  const [postData, setPostData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [friend, setFriend] = useState(null);

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
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        console.log("reached bottom");
      }
    }
  };
  const handleDeletePost = async () => {
    const postID = postData.find((post) => post._id === viewPostData._id);
    const resDelete = await deletePost(viewPostData._id, currentUser.token);
    // const resDelete = await deletePost(postData._id, currentUser.token);
    const newListPosts = [...listPosts];

    if (resDelete.status === 200) {
      newListPosts.filter((post) => post._id !== viewPostData._id);
      dispatch(setListPosts(newListPosts));
      setPostData(newListPosts);
    }
  };

  const FriendsList: FC<{ friendId: string }> = (props): JSX.Element => {
    // useEffect(() => {
    //   getProfileID(props.friendId).then((res) => {
    //     if (res.status === 200) {
    //       setFriend(res.data);
    //       console.log("res.data: ", res.data);
    //     }
    //   });
    // }, []);
    console.log("Friend: ", props.friendId);

    return (
      <div className='list-friends__body-item'>
        <div className='wrapper-avatar'>
          <img
            src='https://br.atsit.in/vi/wp-content/uploads/2022/01/boruto-co-thuc-su-da-chet-trong-manga-khong.jpg'
            alt='avatar'
            className='avatar-friend'
          />
          <p className='active-point'>&nbsp;</p>
        </div>
        <p>Bạn của tôi</p>
      </div>
    );
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
              postData.map((post, index: number) => <Post key={index} postData={post} />)
            )}
          </div>
          <div className='list-friends'>
            <div className='list-friends__header'>
              <p>Contacts</p>
              <div className='list-friends__funtion-btn'>
                <AiOutlineSearch />
              </div>
            </div>
            {currentUser.friends.map((friend: string, index: any) => (
              <FriendsList friendId={friend} key={index} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
