import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsDownload } from "react-icons/bs";
import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const Likes = (props) => {
  const [loading, setLoading] = useState(true);
  const [setUserPosts] = useState([]);
  const { currentUser } = props;
  const [likes, setLikes] = useState([]);

  function loadLikes() {
    const recentMessagesQuery = query(
      collection(getFirestore(), "messages"),
      orderBy("timestamp", "desc")
    );
    // loadUserPosts();

    // Start listening to the query.
    onSnapshot(recentMessagesQuery, function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        let message = change.doc.data();
        if (message.tweetLikes.includes(currentUser?.email)) {
          likes.push({
            postData: change.doc.id,
            timestamp: message.timestamp,
            name: message.name,
            text: message.text,
            avatar: message.profilePicUrl,
            url: message.imageUrl,
            email: message.email,
            likes: message.tweetLikes.length,
          });
        }
        setLoading(false);
      }); //outside of forEach
    });
  }

  useEffect(() => {
    loadLikes();
  }, []);

  return (
    <div className="tweets-container">
      <div className="user-likes"> {currentUser?.displayName} likes</div>
      {likes.map((post) => {
        return (
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
                    <FaRegHeart color="gray" fill="red" />
                    <p className="likes-count">{post.likes}</p>
                  </button>
                  <button>
                    <BsDownload color="gray" />
                  </button>
                </div>
              </Link>
            </div>
          </div>
          // {/* </Link> */}
        );
      })}
    </div>
  );
};

export default Likes;
