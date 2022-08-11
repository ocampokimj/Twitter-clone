import React from "react";
import Nav from "./Nav";
import Gif from "./Gif";
import Likes from "./Likes";

const LikesPage = (props) => {
  const { signOutUser, currentUser } = props;

  return (
    <div className="likes-page">
      <Nav signOutUser={signOutUser} currentUser={currentUser} />
      <Likes currentUser={currentUser} />
      <Gif />
    </div>
  );
};

export default LikesPage;
