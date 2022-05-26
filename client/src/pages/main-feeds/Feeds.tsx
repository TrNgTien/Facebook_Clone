import React, { useEffect, useRef, useState } from "react";
import "./styles/Feeds.scss";
import { MainLayout } from "@components/common/layout/index";
import Post from "./components/post/Post";
import { getAllFeed } from "@services/FeedsService";
import Sidebar from "./components/sidebar/Sidebar";
import Upload from "./components/upload/Upload";
export default function Feeds() {
  const listInnerRef = useRef<HTMLDivElement>(null);
  const [postData, setPostData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const getPostData = async () => {
      setIsLoading(true);
      const dataPost = await getAllFeed(userToken);
      if (dataPost.status === 200) {
        setPostData(dataPost.data.data);
        setIsLoading(false);
      }
    };
    getPostData();
  }, []);
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
          <Sidebar />
          <div className='body-feeds'>
            <Upload />
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              postData.map((post: any, index: number) => <Post key={index} post={post} />)
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

//  <div className='body-feeds' onScroll={() => onScroll()} ref={listInnerRef}>
