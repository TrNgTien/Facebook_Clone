import { MainLayout } from "@components/common/layout";
import CircleLoading from "@components/common/loading-delay/CircleLoading";
import { IJwtDecode } from "@constants/InterfaceModel";
import { useAppSelector } from "@hooks/useStore";
import { addFriend } from "@services/FriendsService";
import { getLocalStorage } from "@utils/LocalStorageUtil";
import jwtDecode from "jwt-decode";
import React, { memo, useEffect, useState } from "react";
import { BsPersonCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./FindFriends.scss";
function FindFriends() {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [users, setUsers] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddFriendLoading, setIsAddFriendLoading] = useState(false);
  useEffect(() => {
    const currentUserId = jwtDecode<IJwtDecode>(currentUser.token).id;
    setIsLoading(true);
    // const queryAllUser = getAllUser(currentUser.token).then((res) => {
    //   if (res.status === 200) {
    //     const listUser: Array<any> = res.data.data;

    //     setUsers([...listUser.filter((user) => user._id !== currentUserId)]);
    //     setIsLoading(false);
    //     console.log("users: ", users);
    //   }
    // });
  }, []);
  const handleAddFriend = async (friendId: string) => {
    const reqBody = {
      token: currentUser.token,
      friendId: friendId,
    };
    setIsAddFriendLoading(true);
    const resAddFriend = addFriend(reqBody).then((res) => {
      if (res.status === 200) {
        setIsAddFriendLoading(false);
      }
    });
  };
  return (
    <MainLayout>
      <div className='find-friends__wrapper'>
        <div className='find-friends__container'>
          <p className='friend-page-tag'>People you may know</p>
          {isLoading ? (
            <CircleLoading />
          ) : (
            <div className='find-friends__list'>
              {users.map((user) => (
                <div
                  className='friend__card'
                  key={user._id}
                  onClick={() => navigate(`/profile/${user._id}`)}
                >
                  <div className='friend__img-container'>
                    <img src={user.userAvatar.url} alt='' className='friend-avatar' />
                  </div>
                  <div className='friend__body-container'>
                    <div className='friend__name-container'>
                      <p className='friend-name'>{user.firstName + " " + user.lastName}</p>
                    </div>
                    {!currentUser.friends.some((friend: string) => friend === user._id) ? (
                      <div className='functional-btns-container'>
                        <div className='function-btn'>
                          {isAddFriendLoading ? (
                            <p>adding...</p>
                          ) : (
                            <button
                              className='functional-friend-btn functional-friend-btn--add'
                              onClick={() => handleAddFriend(user._id)}
                            >
                              Add Friend
                            </button>
                          )}
                        </div>
                        <div className='function-btn'>
                          <button className='functional-friend-btn functional-friend-btn--remove'>
                            Message
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className='functional-btns-container'>
                        <div className='function-btn'>
                          {isAddFriendLoading ? (
                            <p>adding...</p>
                          ) : (
                            <button className='functional-friend-btn functional-friend-btn--add'>
                              <BsPersonCheckFill />
                              &nbsp; Friends
                            </button>
                          )}
                        </div>
                        <div className='function-btn'>
                          <button className='functional-friend-btn functional-friend-btn--remove'>
                            Message
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default memo(FindFriends);
