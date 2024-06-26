import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/stock";
import Login from "./components/login";
import SignUp from "./components/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/home";
import { useState } from "react";
import { auth } from "./components/firebase";
import Home from "./components/proposedHome";
import Education from './components/Education';

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
      <div className= "App">
        <Routes>
          <Route path="/onboarding" element={<Profile />} />
          <Route path="/education" element={<Education />} />
        </Routes>
        <div className="auth-wrapper">
          <div className=  "auth-inner">
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/onboarding"  /> : <Login />} 
              />
              {/* <Route path="/education" element={<Education />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
