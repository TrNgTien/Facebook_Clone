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

import "./styles/NewsFeed.scss";

export default function NewsFeed() {
  const dispatch = useAppDispatch();
  const listInnerRef = useRef<HTMLDivElement>(null);
  const { isCreatePost, viewPostData, listPosts } = useAppSelector((state) => state.post);
  const { currentUser } = useAppSelector((state) => state.auth);
  const [postData, setPostData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(setIsCreatePost(false));
    if (listPosts) {
      setPostData(listPosts);
    }
  }, [dispatch, listPosts]);
  useEffect(() => {
    const userToken = getLocalStorage("token");
    const getPostData = async () => {
      setIsLoading(true);
      await getAllFeed(userToken)
        .then((dataPost) => {
          const sortedData = dataPost.data.data.sort((a: any, b: any) => {
            return new Date(b.time).valueOf() - new Date(a.time).valueOf();
          });
          dispatch(setListPosts(sortedData));
          setPostData(sortedData);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
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
  return (
    <MainLayout>
      <div className='feeds-container'>
        <div className='body-container'>
          {isCreatePost && <UploadPost />}
          {viewPostData.isViewPost && <ViewPost />}
          <Sidebar />
          <div className='body-feeds' onScroll={onScroll} ref={listInnerRef}>
            {currentUser && <Upload />}
            {isLoading ? (
              <Post.PostLoading />
            ) : postData.length > 0 ? (
              postData.map((post, index: number) => <Post key={index} postData={post} />)
            ) : (
              <h1 style={{ marginTop: "5%" }}>No Post Yet</h1>
            )}
          </div>
          <div className='list-friends'>
            <div className='list-friends__header'>
              <p>Contacts</p>
              <div className='list-friends__funtion-btn'>
                <AiOutlineSearch />
                <AiOutlineSearch />
                <AiOutlineSearch />
              </div>
            </div>
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
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
