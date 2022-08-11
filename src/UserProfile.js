// import React, { useEffect } from "react";
// import Nav from "./Nav";
// import Gif from "./Gif";
// import { Link, useParams } from "react-router-dom";
// import {
//     BsBookshelf,
//     BsCalendarPlus,
//     BsCardImage,
//     BsDownload,
//     BsArrowLeft,
//   } from "react-icons/bs";

// import { useState } from "react";
// import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
// import {
//     getFirestore,
//     collection,
//     addDoc,
//     query,
//     orderBy,
//     limit,
//     onSnapshot,
//     setDoc,
//     updateDoc,
//     doc,
//     serverTimestamp,
//     getDocs,
//   } from "firebase/firestore";


// const Profile = (props) => {
// const [loading, setLoading] = useState(true);
// const {currentUser} = props;
// const [userPosts, setUserPost] = useState([]);

// // const currentEmail = currentUser
// const params = useParams();
// console.log(params)
// // console.log(currentEmail?.email)

// function loadUserPosts() {
//     // Create the query to load the last 12 messages and listen for new ones.
//     const recentMessagesQuery = query(
//       collection(getFirestore(), "messages"),
//       orderBy("timestamp", "desc")
//     );

//     // Start listening to the query.
//     onSnapshot(recentMessagesQuery, function (snapshot) {
//       snapshot.docChanges().forEach(function (change) {
//         let message = change.doc.data();
//         if(message.email === currentUser?.email) {
//             userPosts.push({
//                 postData: change.doc.id,
//                 timestamp: message.timestamp,
//                 name: message.name,
//                 text: message.text,
//                 avatar: message.profilePicUrl,
//                 url: message.imageUrl,
//                 email: message.email,
//                 id: message.id
//             })
//         }

// setLoading(false)

//       }
      
      
//       ); //outside of forEach

//     });

    
//   }

// console.log(userPosts)

// console.log(userPosts)
// useEffect(() => {
//     const filtered = loadUserPosts();
//     return filtered
// }, [])



//     // if(loading) {
//     //     return  <h1>loading firebase</h1>
//     // }
//     // console.log(currentUser.email)

//   console.log(userPosts);
//     return(
//         <div className="profile-container">
//             <Nav />
//             <div className="profile-content">
//                 <div className="back-btn-container">
//                 <Link to={`/feed`} style={{ textDecoration: "none" }}>
//                             <button><BsArrowLeft /></button>
//                 </Link>
//                             <div className="top-username">{currentUser?.displayName}</div>
//                 </div>
//                 <div className="profile-header">
//                     <div className="individual-image-container">
//                         <img src={currentUser?.photoURL} alt="" className="profile-account-img" referrerPolicy="no-referrer"/>
//                         <div className="profile-handle">{currentUser?.displayName}</div>
//                     </div>
//                     <button className="edit-profile">Edit Profile</button>
//                 </div>
//                 <div className="joined-date-container">
//                     <div className="joined-date"> Joined - {currentUser?.metadata.creationTime}</div>
//                     <div className="following-container">
//                         <div className="following">333 following</div>
//                         <div className="followers">444 following</div>
//                     </div>
//                 </div>
//                 <div className="profile-content">
//                 <div className="tweets-container">
//                 {userPosts.map((userPost) => {
//           return (
//             <Link to={`/${userPost?.id}`} style={{ textDecoration: "none" }}>
//             <div className="single-tweet-container">
//               <img
//                 src={userPost.avatar}
//                 alt=""
//                 className="feed-account-img"
//                 referrerPolicy="no-referrer"
//               />
//               <div className="single-tweet-content">
//                 <div className="single-tweet-names-container">
//                   <div className="single-tweet-name-bold">@{userPost.name}</div>
//                   <div className="single-tweet-username"></div>
//                 </div>
//                 <div className="single-tweet-context">{userPost.text}</div>
//                 <div className="single-tweet-interactions">
//                   <FaRegComment color="gray" />
//                   <FaRetweet size="1.5em" color="gray" />
//                   <FaRegHeart color="gray" />
//                   <BsDownload color="gray" />
//                 </div>
//               </div>
//             </div>
//             </Link>
//           );
//         })}
//                 </div>
//                 </div>
//             </div>
//             <Gif />
//         </div>
//     )
// }

// export default Profile;
