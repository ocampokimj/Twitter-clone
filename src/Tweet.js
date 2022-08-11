import React, { useEffect } from "react";
import { RiFileGifLine } from "react-icons/ri";
import { CgPoll } from "react-icons/cg";
import { GrEmoji } from "react-icons/gr";
import { Link } from "react-router-dom";
import {
  BsBookshelf,
  BsCalendarPlus,
  BsCardImage,
  BsDownload,
} from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { MdLightMode } from "react-icons/md";
import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { uniqid } from "uniqid";
import { v4 as uuidv4 } from "uuid";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  getDocs,
  DocumentReference,
} from "firebase/firestore";

const Tweet = (props) => {
  const accountImage = require("./images/ald2.jpeg");
  const { currentUser, getUserName, getProfilePicUrl } = props;

  const [tweet, setTweet] = useState("");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postToPush, setPostToPush] = useState([]);
  const [profileTweet, setProfileTweet] = useState([]);
  const [likes, setLikes] = useState([]);
  const [likedArr, setLikedArr] = useState([]);
  const [liked, setLiked] = useState(false);

  // console.log(loadMessage())
  //adding messages to cloud firestore

  const handleTweet = (e) => {
    e.preventDefault();
    setTweet(e.target.value);
  };
  // console.log(tweet);

  // Saves a new message to Cloud Firestore.
  async function saveMessage(e) {
    // Add a new message entry to the Firebase database.
    e.preventDefault();
    try {
      await addDoc(
        collection(getFirestore(), "messages"),
        {
          name: currentUser.displayName,
          text: tweet,
          profilePicUrl: currentUser.photoURL,
          timestamp: serverTimestamp(),
          email: currentUser.email,
          id: uuidv4(),
          tweetLikes: [],
        }

        // using uuidv4() since i dont know how to fetch the collection id.
        // need it to match the tweet params with the tweet.
      );
    } catch (error) {
      console.error("Error writing new message to Firebase Database", error);
    }
    window.location.reload(false);
    // setLoading(false)
  }

  // // // Loads chat messages history and listens for upcoming ones.
  function loadMessages() {
    const recentMessagesQuery = query(
      collection(getFirestore(), "messages"),
      orderBy("timestamp", "desc")
    );

    // Start listening to the query.
    onSnapshot(recentMessagesQuery, function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        let message = change.doc.data();

        posts.push({
          postData: change.doc.id,
          timestamp: message.timestamp,
          name: message.name,
          text: message.text,
          avatar: message.profilePicUrl,
          url: message.imageUrl,
          email: message.email,
          id: message.id,
          userId: currentUser?.id,
          likes: message.tweetLikes,
        });
        setLikedArr(message.tweetLikes);
        setLoading(false);
      }); //outside of forEach
    });
  }

  useEffect(() => {
    const loadIt = loadMessages();
    return loadIt;
  }, []);

  return (
    <div className="content-container">
      <div className="content-top">
        <p className="home">Home</p>
        <button className="mode">
          <MdLightMode />
        </button>
      </div>
      <div className="tweet-container-side">
        <div className="account-image-feed">
          <img
            src={currentUser?.photoURL}
            alt=""
            className="feed-account-img"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="tweet-container">
          <div className="input-feed">
            <textarea
              type="typetext"
              className="tweet-input"
              placeholder="what's happening?"
              onChange={handleTweet}
              value={tweet}
            />
          </div>
          <div className="everyone-reply">Everyone can reply</div>
          <div className="media-upload">
            <div className="upload">
              <button>
                <BsCardImage color="#1DA1F2" />
              </button>
              <button>
                <RiFileGifLine color="#1DA1F2" />
              </button>
              <button>
                <CgPoll color="#1DA1F2" />
              </button>
              <button>
                <GrEmoji color="#1DA1F2" />
              </button>
              <button>
                <BsCalendarPlus color="#1DA1F2" />
              </button>
              <button>
                <GoLocation color="#1DA1F2" />
              </button>
            </div>
            <button
              type="submit"
              className="tweet-feed-submit"
              onClick={saveMessage}
            >
              tweet
            </button>
          </div>
        </div>
      </div>
      <div className="tweets-container">
        {posts.map((post) => {
          return (
            // <Link to={`/${post?.id}`} style={{ textDecoration: "none" }}>
            <div className="single-tweet-container">
              <Link
                to={`/feed/${post?.postData}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={post.avatar}
                  alt=""
                  className="feed-account-img"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <div className="single-tweet-content">
                <div className="single-tweet-names-container">
                  <div className="single-tweet-name-bold">@{post.name}</div>
                  <div className="single-tweet-username"></div>
                </div>
                <Link to={`/${post?.id}`} style={{ textDecoration: "none" }}>
                  <div className="single-tweet-context">{post.text}</div>
                  <div className="single-tweet-interactions">
                    <button>
                      <FaRegComment color="gray" />
                    </button>
                    <button>
                      <FaRetweet size="1.5em" color="gray" />
                    </button>
                    <button className="likes-btn">
                      {post.likes.includes(currentUser?.email) ? (
                        <FaRegHeart color="gray" fill="red" />
                      ) : (
                        <FaRegHeart fill="white" />
                      )}
                      {/* <FaRegHeart color="gray" /> */}
                      <p className="likes-count">{post.likes.length}</p>
                    </button>
                    <button>
                      <BsDownload color="gray" />
                    </button>
                    {/* <FaRegComment color="gray" />
                  <FaRetweet size="1.5em" color="gray" />
                  <FaRegHeart color="gray" />
                  <BsDownload color="gray" /> */}
                  </div>
                </Link>
              </div>
            </div>
            // {/* </Link> */}
          );
        })}
      </div>
    </div>
  );
};

export default Tweet;
