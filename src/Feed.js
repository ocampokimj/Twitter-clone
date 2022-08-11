import React from "react";
import Nav from "./Nav";
import Tweet from "./Tweet";
import Gif from "./Gif";

const Feed = (props) => {
  const {
    signOutUser,
    currentUser,
    handleTweet,
    getUserName,
    getProfilePicUrl,
  } = props;

  return (
    <div className="feed">
      <Nav signOutUser={signOutUser} currentUser={currentUser} />
      <Tweet
        currentUser={currentUser}
        getUserName={getUserName}
        getProfilePicUrl={getProfilePicUrl}
      />
      <Gif />
    </div>
  );
};

export default Feed;
