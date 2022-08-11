import React, { useEffect } from "react";
import Nav from "./Nav";
import Gif from "./Gif";
import { Link } from "react-router-dom";
import { BsDownload, BsArrowLeft } from "react-icons/bs";

import { useState } from "react";
import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const OwnProfile = (props) => {
  const [loading, setLoading] = useState(true);
  const { currentUser } = props;
  const [userPosts, setUserPost] = useState([]);
  const [profiles, setProfiles] = useState([]);

  function loadProfile() {
    const recentMessagesQuery = query(
      collection(getFirestore(), "messages"),
      orderBy("timestamp", "desc")
    );
    // loadUserPosts();

    // Start listening to the query.
    onSnapshot(recentMessagesQuery, function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        let message = change.doc.data();
        // console.log(change.doc.id)
        if (message.email === currentUser?.email) {
          profiles.push({
            postData: change.doc.id,
            timestamp: message.timestamp,
            name: message.name,
            text: message.text,
            avatar: message.profilePicUrl,
            url: message.imageUrl,
            email: message.email,
            id: message.id,
            likes: message.tweetLikes
          });
        }
        setLoading(false);
      }); //outside of forEach
    });
  }

  useEffect(() => {
    const loadProfileTweets = loadProfile();
    return loadProfileTweets;
  }, []);

  return (
    <div className="profile-container">
      <Nav />
      <div className="profile-content">
        <div className="back-btn-container">
          <Link to={`/feed`} style={{ textDecoration: "none" }}>
            <button>
              <BsArrowLeft />
            </button>
          </Link>
          <div className="top-username">{currentUser?.displayName}</div>
        </div>
        <div className="profile-header">
          <div className="individual-image-container">
            <img
              src={currentUser?.photoURL}
              alt="hello"
              className="profile-account-img"
            />
            <div className="profile-handle">{currentUser?.displayName}</div>
          </div>
          <button className="edit-profile">Edit Profile</button>
        </div>
        <div className="joined-date-container">
          <div className="joined-date"> Joined - {currentUser?.name}</div>
          <div className="following-container">
            <div className="following"></div>
            <div className="followers"></div>
          </div>
        </div>
        <div className="profile-content">
          <div className="tweets-container">
            {profiles.map((profile) => {
              return (
                <Link to={`/${profile?.id}`} style={{ textDecoration: "none" }}>
                  <div className="single-tweet-container">
                    <img
                      src={profile.avatar}
                      alt=""
                      className="feed-account-img"
                      referrerPolicy="no-referrer"
                    />
                    <div className="single-tweet-content">
                      <div className="single-tweet-names-container">
                        <div className="single-tweet-name-bold">
                          @{profile.name}
                        </div>
                        <div className="single-tweet-username"></div>
                      </div>
                      <div className="single-tweet-context">{profile.text}</div>
                      <div className="single-tweet-interactions">
                        <button>
                          <FaRegComment color="gray" />
                        </button>
                        <button>
                          <FaRetweet size="1.5em" color="gray" />
                        </button>
                        <button className="likes-btn">
                        {profile.likes.includes(currentUser?.email) ? (
                        <FaRegHeart color="gray" fill="red" />
                      ) : (
                        <FaRegHeart fill="white" />
                      )}
                      {/* <FaRegHeart color="gray" /> */}
                          <p className="likes-count">{profile.likes.length}</p>
                        </button>
                        <button>
                          <BsDownload color="gray" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <Gif />
    </div>
  );
};

export default OwnProfile;
