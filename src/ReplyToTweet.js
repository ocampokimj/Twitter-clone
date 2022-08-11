import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsDownload } from "react-icons/bs";
import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { uniqid } from "uniqid";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const ReplyToTweet = (props) => {
  const [loading, setLoading] = useState(true);
  const [setUserPosts] = useState([]);
  const [reply, setReply] = useState([]);
  const { id, userPosts, currentUser, likedArr } = props;
  const [toggle, setToggle] = useState(false);
  const [replies, setReplies] = useState(false);
  // const [zeroReplies, setZeroReplies] = useState(false)

  const loadReplies = () => {
    // load replies from the subcollection
    const recentMessagesQuery = query(
      collection(getFirestore(), "messages", id, "reply"),
      orderBy("timestamp", "desc")
    );

    // Start listening to the query.
    onSnapshot(recentMessagesQuery, function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        let message = change.doc.data();
        userPosts.push({
          postData: change.doc.id,
          timestamp: message.timestamp,
          name: message.name,
          text: message.text,
          avatar: message.profilePicUrl,
          url: message.imageUrl,
          email: message.email,
          id: message.id,
        });

        setLoading(false);
      }); //outside of forEach
    });
  };

  let userPostCount = userPosts.length;
  console.log(userPostCount);

  return (
    <div className="replies-container">
      <div className="reply-container">
        <button
          name="replies"
          color="white"
          className="view-replies"
          onClick={loadReplies}
        >
          Replies
        </button>
      </div>
      {userPosts.map((userPost) => {
        return (
          // <Link to={`/${userPost?.id}`} style={{ textDecoration: "none" }}>
          <div className="replies-tweet-container">
            {/* <Link to={`/feed/${userPost?.postData}`} style={{ textDecoration: "none" }}> */}
            <img
              src={userPost.avatar}
              alt=""
              className="feed-account-img"
              referrerPolicy="no-referrer"
            />
            <div className="single-tweet-content">
              <div className="single-tweet-names-container">
                <div className="single-tweet-name-bold">@{userPost?.name}</div>
                <div className="single-tweet-username"></div>
              </div>
              <div className="single-tweet-context">{userPost?.text}</div>
              <div className="single-tweet-interactions">
                <FaRegComment color="gray" />
                <FaRetweet size="1.5em" color="gray" />
                <FaRegHeart color="gray" />
                <BsDownload color="gray" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReplyToTweet;
