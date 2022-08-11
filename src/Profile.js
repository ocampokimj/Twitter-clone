import React, { useEffect } from "react";
import Nav from "./Nav";
import Gif from "./Gif";
import { Link, useParams } from "react-router-dom";
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

const Profile = (props) => {
  const [loading, setLoading] = useState(true);
  const { currentUser } = props;
  const [userPosts, setUserPost] = useState([]);
  const [otherProfiles, setOtherProfiles] = useState([]);

  const currentEmail = currentUser;

  const params = useParams();

  //to get the id and use that id to get the email.
  function loadUserPosts() {
    const recentMessagesQuery = query(
      collection(getFirestore(), "messages"),
      orderBy("timestamp", "desc")
    );

    // Start listening to the query.
    onSnapshot(recentMessagesQuery, function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        let message = change.doc.data();
        // console.log(change.doc.id)
        if (change.doc.id === params?.id) {
          userPosts.push({
            postData: change.doc.id,
            timestamp: message.timestamp,
            name: message.name,
            text: message.text,
            avatar: message.profilePicUrl,
            url: message.imageUrl,
            email: message.email,
            id: message.id,
            likes: message.tweetLikes.length,
          });
        }
        setLoading(false);
      }); //outside of forEach
    });
  }

  //after getting the id look for an email that match to get "user profile"
  function loadProfile() {
    const recentMessagesQuery = query(
      collection(getFirestore(), "messages"),
      orderBy("timestamp", "desc")
    );
    loadUserPosts();

    // Start listening to the query.
    onSnapshot(recentMessagesQuery, function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        let message = change.doc.data();
        // console.log(change.doc.id)
        if (message.email === userPosts[0]?.email) {
          otherProfiles.push({
            postData: change.doc.id,
            timestamp: message.timestamp,
            name: message.name,
            text: message.text,
            avatar: message.profilePicUrl,
            url: message.imageUrl,
            email: message.email,
            id: message.id,
            likes: message.tweetLikes,
          });
        }
        setLoading(false);
      }); //outside of forEach
    });
  }

  useEffect(() => {
    loadProfile();
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
          <div className="top-username">{userPosts[0]?.displayName}</div>
        </div>
        <div className="profile-header">
          <div className="individual-image-container">
            <img
              src={userPosts[0]?.avatar}
              alt=""
              className="profile-account-img"
            />
            <div className="profile-handle">{userPosts[0]?.displayName}</div>
          </div>
          <button className="edit-profile">Edit Profile</button>
        </div>
        <div className="joined-date-container">
          <div className="joined-date"> Joined - {userPosts[0]?.name}</div>
          <div className="following-container">
            <div className="following"></div>
            <div className="followers"></div>
          </div>
        </div>
        <div className="profile-content">
          <div className="tweets-container">
            {otherProfiles.map((otherProfile) => {
              return (
                <Link
                  to={`/${otherProfile?.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="single-tweet-container">
                    <img
                      src={otherProfile?.avatar}
                      alt=""
                      className="feed-account-img"
                      referrerPolicy="no-referrer"
                    />
                    <div className="single-tweet-content">
                      <div className="single-tweet-names-container">
                        <div className="single-tweet-name-bold">
                          @{otherProfile?.name}
                        </div>
                        <div className="single-tweet-username"></div>
                      </div>
                      <div className="single-tweet-context">
                        {otherProfile?.text}
                      </div>
                      <div className="single-tweet-interactions">
                        <button>
                          <FaRegComment color="gray" />
                        </button>
                        <button>
                          <FaRetweet size="1.5em" color="gray" />
                        </button>
                        <button className="likes-btn">
                          {otherProfile?.likes.includes(currentUser?.email) ? (
                            <FaRegHeart color="gray" fill="red" />
                          ) : (
                            <FaRegHeart color="gray" />
                          )}
                          <p className="likes-count">
                            {otherProfile?.likes.length}
                          </p>
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

export default Profile;