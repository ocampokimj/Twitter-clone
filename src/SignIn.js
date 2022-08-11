import React from "react";

import { BsTwitter } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  useAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { async } from "@firebase/util";
import Feed from "./Feed";

const SignInPage = (props) => {
  const { signIn } = props;

  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <p className="sign-in-logo">
            <BsTwitter />
          </p>
        </Link>
        <p className="sign-in-greeting">Sign in to Twitter</p>
        <button className="btn-google" onClick={() => signIn()}>
          <FcGoogle size=".5rem" /> sign in with google
        </button>
        <button className="btn-apple">
          <AiFillApple color="white" /> sign up with apple
        </button>
        <p className="or">or</p>
        <input type="text" placeholder="Email" className="sign-in-twitter" />
        <input
          type="password"
          className="sign-in-password"
          placeholder="Password"
        />
        <Link to="/feed" style={{ textDecoration: "none" }}>
          <button className="btn-signin">Sign in</button>
        </Link>
        <div className="login-signup-container">
          <p className="login-question">Don't have an account?</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <button className="sign-up-redirect">Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
