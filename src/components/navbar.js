import React, { useState, useEffect, useContext } from "react";
import logo from "../img/logo.jpeg";
import "./navbar.css";
import { Link } from "react-router-dom";
import { authContext } from "../App";
import axios from "axios";

export default function Navbar() {
  const { isLoggedIn, loggedOut, isVendorLoggedIn } = useContext(authContext);
  const [searchQuery, setSearchQuery] = useState("");

  function handleLogout(e) {
    localStorage.clear();
    loggedOut();
  }

  return (
    <div className="navbar">
      <img src={logo} alt="" />
      <ul className="nav-menu">
        {isLoggedIn ? (
          <>
            <Link to="/">
              <span className="material-symbols-outlined">home</span>
            </Link>
            <Link to="/userProfile">
              <span class="material-symbols-outlined">search</span>
              </Link>
            <Link to="/Profile">
              <span class="material-symbols-outlined">account_circle</span>
            </Link>
            <Link to="/CreatePost">
              <span class="material-symbols-outlined">add_circle</span>
            </Link>
            <Link
              className="loggedOutButton"
              onClick={handleLogout}
              to="/SingIn"
            >
              <span class="material-symbols-outlined">logout</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/SingUp">
              <li>SignUp</li>
            </Link>
            <Link to="/SingIn">
              <li>SignIn</li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
}
