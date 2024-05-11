import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import Home from "./proposedHome";
import './proposedHome.css'

import Loading from '../assets/Loading5.gif'

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const navigate = useNavigate();
  const toEducatoryForum = () => {
    navigate('/home');
  };
  return (
    <div className="full-screen-image-container">
      {userDetails ? (
        <div className="home-container">
          <Home userDetails={userDetails} />
        </div>
        // toEducatoryForum()
        // <>
        //   <div style={{ display: "flex", justifyContent: "center" }}>
        //     <img
        //       src={userDetails.photo}
        //       width={"40%"}
        //       style={{ borderRadius: "50%" }}
        //       alt="Profile Image"
        //     />
        //   </div>
        //   <h3>Welcome {userDetails.firstName}</h3>
        //   <div>
        //     <p>Email: {userDetails.email}</p>
        //     <p>First Name: {userDetails.firstName}</p>
        //     <p>Last Name: {userDetails.lastName}</p>
        //   </div>
        //   <button component={Link} to='/login' variant="contained" color="primary">
        //   Educatory
        //   </button>
        //   <button className="btn btn-primary" onClick={toEducatoryForum}>
        //     Educatory
        //   </button>
        //   <button className="btn btn-primary" onClick={handleLogout}>
        //     Logout
        //   </button>
        // </>
      ) : (
        <img src = {Loading} className="full-screen-image"/>
      )}
      {/* <p style={{alignContent: "center", alignItems: "center"}}>Loading...</p> */}
    </div>
  );
}

export default Profile;