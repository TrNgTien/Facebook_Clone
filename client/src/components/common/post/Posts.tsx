import React, { useState, useEffect } from "react";
import { getProfileID } from "@services/ProfileService";
import { useAppSelector, useAppDispatch } from "@hooks/useStore";
import { BsThreeDots } from "react-icons/bs";
import { setViewPost } from "@slices/PostSlice";
import InteractionPost from "@components/feat/post-features/InteractionPost";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { decodedID } from "@utils/DecodeToken";
import { getCommentByPostID } from "@services/NewsFeedService";
import CommentInput from "@components/feat/comment-input/CommentInput";
import Comments from "@components/common/comment-bubble/Comments";
import { addComment } from "@services/NewsFeedService";
import "./Posts.scss";

interface IProps {
  postData: any;
  handleDeletePost: any;
}

function Post({ postData, handleDeletePost }: IProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { viewPostData, viewCommentPost } = useAppSelector((state) => state.post);
  const { time, description, postAttachments, likedPost, userID, _id, numberOfComment } =
    postData;
  const [ownID, setOwnID] = useState<string>();
  const [posterData, setPosterData] = useState<any>([]);
  const convertedTime = new Date(time).toLocaleString();
  const [commentData, setCommentData] = useState<any>([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    if (currentUser) {
      setOwnID(decodedID(currentUser?.token));
    }
    getCommentByPostID(_id)
      .then((res) => {
        if (res.status === 200) {
          setCommentData(res.data.commentData);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });

    const getProfileData = async () => {
      const profileRes = await getProfileID(userID);
      if (profileRes.status === 200) {
        setPosterData(profileRes.data.data);
      }
    };
    getProfileData();
  }, [userID, currentUser, _id, commentData]);
  useEffect(() => {
    if (viewPostData?.dataPost) {
      setCommentData(viewPostData.dataPost.comments);
    }
  }, [viewPostData]);
  const reqDeletePost = () => {
    handleDeletePost(postData._id);
  };
  const ListComments = () => {
    const listComments = commentData.map((itemComment: any, index: number) => (
      <Comments key={index} itemComment={itemComment} />
    ));
    return listComments;
  };
  const handleSubmit = (e: any) => {
    if (e.key === "Enter") {
      const data = {
        idPost: _id,
        commentContent: comment,
        token: currentUser.token,
      };
      const newComment = {
        userAvatarCommented: currentUser.userAvatar.url,
        userID,
        commentContent: comment,
        userFullName: currentUser.fullName,
      };
      addComment(data)
        .then(() => {
          setCommentData([...commentData, newComment]);
          setComment("");
        })
        .catch((err) => console.log(err));
    }
  };
  if (!posterData) {
    return <PostLoading />;
  } else {
    return (
      <div className='container' id='container-post'>
        <div className='container__top'>
          {posterData.userAvatar && (
            <img
              className='img-avatar'
              src={posterData.userAvatar?.url}
              alt='avatar'
              onClick={() => navigate(`/profile/${postData?.userID}`)}
            />
          )}

          <div className='container__top-info'>
            <h4 className='container__top-username'>
              {posterData && posterData?.firstName + " " + posterData?.lastName}
            </h4>
            <p className='container__top-timestamp'>{convertedTime}</p>
          </div>
          {currentUser && postData?.userID === ownID && (
            <i className='three-dot__icon'>
              <AiOutlineClose onClick={reqDeletePost} />
            </i>
          )}
        </div>
        <div className='container__content'>
          <p
            onClick={() =>
              currentUser
                ? dispatch(
                    setViewPost({
                      ...viewPostData,
                      isViewPost: true,
                      dataPost: {
                        ...postData,
                        fullName: posterData?.firstName + " " + posterData?.lastName,
                        userAvatar: posterData?.userAvatar,
                        comments: commentData,
                      },
                    })
                  )
                : navigate("/")
            }
            className='caption-post'
          >
            {description}
          </p>
        </div>
        <div className='container__img' id='content-img'>
          {postAttachments.url && (
            <img
              className='img-content'
              onClick={() =>
                currentUser
                  ? dispatch(
                      setViewPost({
                        ...viewPostData,
                        isViewPost: true,
                        dataPost: {
                          ...postData,
                          fullName: posterData?.firstName + " " + posterData?.lastName,
                          userAvatar: posterData?.userAvatar,
                          comments: commentData,
                        },
                      })
                    )
                  : navigate("/")
              }
              src={postAttachments.url}
              alt='img'
            />
          )}
        </div>
        <div className='container__status'>
          <p onClick={() => (currentUser ? console.log("like") : navigate("/"))}>
            {likedPost && likedPost.length > 1
              ? `${likedPost.length} likes`
              : `${likedPost.length} like`}
          </p>
          <p onClick={() => !currentUser && navigate("/")}>
            {numberOfComment > 1
              ? `${numberOfComment} comments`
              : `${numberOfComment} comment`}
          </p>
        </div>
        <hr className='divider' />
        <InteractionPost postID={_id} />
        {currentUser &&
          commentData &&
          commentData?.length > 0 &&
          viewCommentPost.isView &&
          viewCommentPost.idPost === _id && (
            <>
              <hr className='divider' />
              <div className='wrapper-comment__list'>
                <ListComments />
              </div>
            </>
          )}
        <hr className='divider' />
        {currentUser && (
          <CommentInput
            postID={_id}
            ownID={ownID}
            value={comment}
            handleSubmit={(e: any) => handleSubmit(e)}
            handleChangeComment={(e: any) => setComment(e.target.value)}
          />
        )}
      </div>
    );
  }
}

const PostLoading = () => {
  return (
    <div className='container' id='container-post'>
      <div className='container__top'>
        <div className='skeleton img-avatar '></div>
        <div className='container__top-info '>
          <div className='skeleton container__top-username '></div>
          <div className='skeleton container__top-timestamp '></div>
        </div>
        <i className='three-dot__icon'>
          <BsThreeDots />
        </i>
      </div>
      <div className='container__content'>
        <p className='skeleton caption-post '></p>
      </div>
      <div className='skeleton container__img ' id='content-img'></div>
      <div className='container__status'>
        <p></p>
        <p></p>
      </div>
      <hr className='divider' />
    </div>
  );
};

Post.PostLoading = PostLoading;

export default Post;
