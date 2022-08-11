import React from "react";
import Nav from "./Nav";
import Gif from "./Gif";
import { Link, useParams } from "react-router-dom";
import { uuidv4 } from "@firebase/util";
import { useEffect } from "react";

import {
  BsDownload,
  BsArrowLeft,
} from "react-icons/bs";

import { useState } from "react";
import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import ReplyToTweet from "./ReplyToTweet";

const IndividualTweet = (props) => {
  const [loading, setLoading] = useState(true);
  const { currentUser } = props;
  const [userPosts, setUserPost] = useState([]);
  const [tweet, setTweet] = useState([]);
  const [reply, setReply] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likedArr, setLikedArr] = useState([]);
  const tweetLikes = tweet[0]?.likes;

  const params = useParams();
  // console.log(repliesCol[0]?.postData)
  const id = tweet[0]?.postData; //collection auto-id
  console.log(id);

  // gets the data for the individual tweet
  function loadUserTweet() {
    // Create the query to load messages in order by date, descending order  and listen for new ones.
    const recentMessagesQuery = query(
      collection(getFirestore(), "messages"),
      orderBy("timestamp", "desc")
    );

    // Start listening to the query.
    onSnapshot(recentMessagesQuery, function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        let message = change.doc.data();
        // onlt get tweet that matches the id of the individual tweet
        if (message.id === params.id) {
          tweet.push({
            postData: change.doc.id, //collection auto-id
            timestamp: message.timestamp,
            name: message.name,
            text: message.text,
            avatar: message.profilePicUrl,
            url: message.imageUrl,
            email: message.email,
            id: message.id,
            likes: message.tweetLikes.length,
          });
          setLikedArr(message.tweetLikes);
          setLoading(false);
        }
      }); //outside of forEach
    });
  }

  // replies section
  const handleReply = (e) => {
    e.preventDefault();
    setReply(e.target.value);
  };

  //to get documents you need odd numbers of param
  //to get collection you need even numbers of param.
  async function saveReplies() {
    // Add a new message entry to the Firestore database.
    // adds subcollection to a collection
    try {
      await addDoc(collection(getFirestore(), "messages", id, "reply"), {
        name: currentUser.displayName,
        text: reply,
        profilePicUrl: currentUser.photoURL,
        timestamp: serverTimestamp(),
        email: currentUser.email,
        id: uuidv4(),
        tweetLikes: [],
      });
      //   loadReplies();
    } catch (error) {
      console.error("Error writing new message to Firebase Database", error);
    }
    window.location.reload(false);
  }

  useEffect(() => {
    loadUserTweet();
  }, []);

  const notImplemented = () => {
    alert("not implemented");
  };

  const isUserLiked = tweet[0]?.likes;

  function closeModal() {
    setToggle(false);
  }

  function toggleLikes() {
    if (!likedArr.includes(currentUser.email)) {
      addLike();
      setLiked(true);
    } else if (likedArr.includes(currentUser.email)) {
      removeLike();
      setLiked(false);
    }
    // window.location.reload(false);
  }

  async function addLike() {
    // Add a new message entry to the Firebase document.
    try {
      await updateDoc(doc(getFirestore(), "messages", id), {
        tweetLikes: arrayUnion(currentUser.email),
      });
    } catch (error) {
      console.error("Error writing new message to Firebase Database", error);
    }
  }

  async function removeLike() {
    // Removes a new message entry to the Firebase document.
    try {
      await updateDoc(doc(getFirestore(), "messages", id), {
        tweetLikes: arrayRemove(currentUser.email),
      });
    } catch (error) {
      console.error("Error writing new message to Firebase Database", error);
    }
  }

  return (
    <div className="individual-tweet-container">
      <Nav />
      <div className="individual-tweet">
        <div className="back-btn-container">
          <Link to={`/feed`} style={{ textDecoration: "none" }}>
            <button>
              <BsArrowLeft />
            </button>
          </Link>
          <div className="top-username">Tweet</div>
        </div>
        <div className="individual-tweet-box">
          <div className="individual-tweet-profile-info">
            <Link
              to={`/feed/${tweet[0]?.postData}`}
              style={{ textDecoration: "none" }}
            >
              <img
                src={tweet[0]?.avatar}
                alt=""
                className="individual-tweet-img"
              />
            </Link>
            <p className="individual-tweet-handle">@{tweet[0]?.name}</p>
          </div>
          <div className="individual-tweet-tweet">{tweet[0]?.text}</div>
          <div className="individual-tweet-time">
            {/* {tweet[0]?.timestamp.seconds}(need to convert to time) */}
          </div>
          {toggle ? (
            <div className="reply-modal">
               <button className='close-modal'onClick={() => {closeModal()}}>x</button>
              <div className="users-replying">
                <img
                  src={currentUser?.photoURL}
                  alt=""
                  className="feed-account-img"
                />
                <p className="replying-to">-replying to-</p>
                <img
                  src={tweet[0]?.avatar}
                  alt=""
                  className="individual-tweet-img"
                />
              </div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                onChange={handleReply}
              ></textarea>
              <button
                onClick={() => {
                  saveReplies();
                }}
                className="reply-btn"
              >
                Reply
              </button>
            </div>
          ) : (
            console.log(tweet[0]?.likes + "num")
          )}
          <div className="individual-tweet-interactions">
            <button>
              <FaRegComment
                color="gray"
                onClick={() => {
                  setToggle(true);
                }}
              />
            </button>
            <button>
              <FaRetweet
                size="1.5em"
                color="gray"
                onClick={() => {
                  notImplemented();
                }}
              />
            </button>
            <button
              onClick={() => {
                toggleLikes();
              }}
              className="likes-btn"
            >
              {likedArr.includes(currentUser?.email) ? (
                <FaRegHeart color="gray" fill="red" />
              ) : (
                <FaRegHeart fill="white" />
              )}
              <p className="likes-count">{likedArr.length}</p>
            </button>
            <button>
              <BsDownload
                color="gray"
                onClick={() => {
                  notImplemented();
                }}
              />
            </button>
          </div>
        </div>
        <ReplyToTweet
          currentUser={currentUser}
          id={id}
          userPosts={userPosts}
          handleReply={handleReply}
          likedArr={likedArr}
        />
      </div>
      <Gif />
    </div>
  );
};

export default IndividualTweet;