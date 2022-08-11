import "./App.css";
import SignInPage from "./SignIn";
import RegisterPage from "./Register";
import Profile from "./Profile";
import Feed from "./Feed";
import LikesPage from "./LikesPage";
import SignUp from "./SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndividualTweet from "./IndividualTweet";
import OwnProfile from "./OwnProfile";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { useEffect, useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState();
  // const [tweet, setTweet] = useState('');
  // Signs-in Friendly Chat.
  async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

  // Signs-out of Friendly Chat.
  function signOutUser() {
    // Sign out of Firebase.
    signOut(getAuth());
  }

  //to keep the logged in user the same event with refresh. Saving the logged in user in state.
  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(), (user) => setCurrentUser(user));
    return unsub;
  }, []);

  // console.log(currentUser?.displayName);

  // Returns the signed-in user's profile Pic URL.
  function getProfilePicUrl() {
    return currentUser?.photoURL || "/images/profile_placeholder.png";
  }

  // Returns the signed-in user's display name.
  function getUserName() {
    return currentUser?.displayName;
  }

  // Returns true if a user is signed-in.
  function isUserSignedIn() {
    return !!getAuth().currentUser;
  }

  // //adding messages to cloud firestore

  console.log(currentUser);
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            {/* <Route path="/signup" element={<SignUp />} /> */}
            <Route
              path="/:id"
              element={<IndividualTweet currentUser={currentUser} />}
            />
            <Route path="/signin" element={<SignInPage signIn={signIn} />} />
            <Route
              path="/feed"
              element={
                <Feed
                  signOutUser={signOutUser}
                  currentUser={currentUser}
                  getUserName={getUserName}
                  getProfilePicUrl={getProfilePicUrl}
                />
              }
            />
            {/* <Route
              path="/logout"
              element={<LogOut signOutUser={signOutUser} />}
            /> */}
            <Route
              path="/"
              element={
                <RegisterPage
                  signIn={signIn}
                  isUserSignedIn={isUserSignedIn}
                  currentUser={currentUser}
                />
              }
            />
            <Route
              path="/feed/:id"
              element={<Profile currentUser={currentUser} />}
            />
            <Route
              path="/profile"
              element={<OwnProfile currentUser={currentUser} />}
            />
            <Route
              path="/likes"
              element={<LikesPage currentUser={currentUser} />}
            />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
