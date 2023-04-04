import React from 'react';
import logo from "../img/logo.jpeg";
import './navbar.css';
import {Link} from "react-router-dom"

export default function navbar() {
  return (
    <div className='navbar'>
        <img src={logo} alt=""/>
      <ul className ="nav-menu">

        <Link to ="/SingUp">
        <li>SingUp</li>
        </Link>
        <Link to ="/SingIn">
        <li>SingIn</li>
        </Link>
        <Link to ="/Profile">
        <li>Profile</li>
        </Link>
      </ul>
    </div>
  )
}
