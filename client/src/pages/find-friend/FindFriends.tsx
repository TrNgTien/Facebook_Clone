import { MainLayout } from "@components/common/layout";
import React, { memo } from "react";
import "./FindFriends.scss";
function FindFriends() {
  return (
    <MainLayout>
      <div className='find-friends__wrapper'>
        <div className='find-friends__list'>
          <h1>hello</h1>
          <p>Grid Friends</p>
          
        </div>
      </div>
    </MainLayout>
  );
}

export default memo(FindFriends);
