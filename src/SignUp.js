import React from "react";
import { useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import { Link } from "react-router-dom";
import { auth } from "./firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const SignUp = () => {
  // return (
  //   <div className="sign-in-page">
  //     <div className="sign-in-container">
  //       <Link to="/" style={{ textDecoration: "none" }}>
  //         <p className="sign-in-logo">
  //           <BsTwitter />
  //         </p>
  //       </Link>
  //       <p className="sign-in-greeting">Sign up to Twitter</p>
  //       <button className="btn-google">
  //         <FcGoogle size=".5rem" /> sign up with google
  //       </button>
  //       <button className="btn-apple">
  //         <AiFillApple color="white" /> sign up with apple
  //       </button>
  //       <p className="or">or</p>
  //       <input type="text" placeholder="Email" className="sign-in-twitter" />
  //       <input
  //         type="password"
  //         className="sign-in-password"
  //         placeholder="Password"
  //       />
  //       <button>Sign up</button>
  //       <div className="login-signup-container">
  //         <p className="login-question">Already have an account?</p>
  //         <Link to="/signin" style={{ textDecoration: "none" }}>
  //           <button className="sign-up-redirect">Sign in</button>
  //         </Link>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default SignUp;
