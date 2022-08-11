import React from "react";
import "./App.css";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
// import { auth } from "./firebase-config";
import { BsTwitter } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import { Link } from "react-router-dom";

const RegisterPage = (props) => {
  const { signIn, isUserSignedIn, currentUser } = props;

  // console.log(auth);

  return (
    <div className="register-page-container">
      <div className="left-side-header-img"></div>
      <div className="right-side-signup">
        <div>
          <BsTwitter />
        </div>
        <div className="happening-now">
          {currentUser ? "Already logged in" : "Happening now"}
        </div>
        <div className="join-now">
          {currentUser ? currentUser.displayName : "Join us now!"}
        </div>
        <div className="signup-container">
          <Link to="/feed" style={{ textDecoration: "none" }}>
            <button className="btn-google" onClick={() => signIn()}>
              <FcGoogle size=".5rem" /> sign in with google
            </button>
          </Link>
          {/* <Link to="/signup" style={{ textDecoration: "none" }}> */}
          <button className="btn-apple">
            <AiFillApple color="white" /> sign in with apple
          </button>
          {/* </Link> */}
          <div className="or">or</div>
          {/* <Link to="/signup" style={{ textDecoration: "none" }}> */}
          <button className="btn-phone-email">
            sign up with phone or email
          </button>
          {/* </Link> */}
          <div className="terms-services">
          By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
          </div>
          <div className="account-already-container">
            <div className="account-already">Already have an account?</div>
            <Link to="/feed" style={{ textDecoration: "none" }}>
              <button className="btn-signin">sign in</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
