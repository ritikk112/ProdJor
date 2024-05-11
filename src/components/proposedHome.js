// import userDetails from './home'
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import Header from "./header";
import './proposedHome.css';
// import { userDetails } from "./home";
// import {
// BrowserRouter as Router,
// Routes,
// Route,
// Navigate,
// useNavigate
// } from "react-router-dom";

async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
//   const navigate = useNavigate();
//   const toEducatoryForum = () => {
//     navigate('/login');
//   };

const Home = ({ userDetails }) =>{
    return(
        <div>
            <Header />
            <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                    src={userDetails.photo}
                    width={"40%"}
                    style={{ borderRadius: "50%" }}
                    alt="Profile Image"
                    />
                </div>
                <h3>Welcome {userDetails.firstName}</h3>
                <div>
                    <p>Email: {userDetails.email}</p>
                    <p>First Name: {userDetails.firstName}</p>
                    <p>Last Name: {userDetails.lastName}</p>
                </div>
                {/* <button className="btn btn-primary" onClick={toEducatoryForum}>
                    Educatory
                </button> */}
                <button className="btn btn-primary" onClick={handleLogout}>
                    Logout
                </button>
            </>
        </div>
    )
    
};
export default Home;