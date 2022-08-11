import React from "react";
import "./App.css";
import { AiTwotoneHome, AiFillBell } from "react-icons/ai";
import { FaHashtag } from "react-icons/fa";
import { BiEnvelope } from "react-icons/bi";
import { BsBookmark, BsTwitter } from "react-icons/bs";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged, authStateObserver } from "firebase/auth";

const Nav = (props) => {
  const accountImage = require("./images/ald2.jpeg");
  const { signOutUser, isUserSignedIn, currentUser } = props;

  console.log(currentUser?.email);
  console.log(currentUser?.uid);

  return (
    <div className="nav">
      <Link to="/feed" style={{ textDecoration: "none" }}>
        <BsTwitter size="1em" className="header-logo" color="#1DA1F2" />
      </Link>
      <div className="nav-container">
        <Link to="/feed" style={{ textDecoration: "none" }}>
          <button className="btn-home">
            <AiTwotoneHome /> Home
          </button>
        </Link>
        {/* <button className="btn-search">
          <FaHashtag /> Explore{" "}
        </button>
        <button className="btn-notifications">
          <AiFillBell /> Notification
        </button>
        <button className="btn-messages">
          <BiEnvelope /> Messages
        </button>
        <button className="btn-archive">
          <BsBookmark /> Bookmarks
        </button> */}
        <Link to="/likes" style={{ textDecoration: "none" }}>
          <button className="btn-news">
            <MdOutlineFeaturedPlayList /> Likes
          </button>
        </Link>
        <Link to={`/profile`} style={{ textDecoration: "none" }}>
          <button className="btn-account">
            <CgProfile /> Profile
          </button>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <button className="btn-toggle" onClick={() => signOutUser()}>
            <HiOutlineDotsCircleHorizontal /> Log Out
          </button>
        </Link>
      </div>
      <button className="btn-tweet">tweet</button>
      <Link to={`/feed/${currentUser?.uid}`} style={{ textDecoration: "none" }}>
        <div className="account-info"></div>
      </Link>
    </div>
  );
};
export default Nav;
