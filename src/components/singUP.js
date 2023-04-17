import React, { useEffect, useState } from "react";

import axios from "axios";
import logo from "../img/singLogo.png";
import "./singUp.css";
import { Link, useNavigate } from "react-router-dom";


export default function SingUP() {
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");



  const postData = async function () {
    const data = await axios.post("https://instagrambackend.onrender.com/singUp", {
      name,
      userName,
      email,
      password,
      phoneNo,
    })
    .then((res)=>{
      console.log(res.data.data);
      alert("successful")
      Navigate("/singIn");
    }).catch((err)=>{
      console.log(err.response)
      alert(err.response.message)
    })
  
  };
  return (
    <div className="singUp">
      <div className="form-container">
        <div className="form">
          <img className="singUpLogo" src={logo} alt="" />
          <p>Sign up to see photos and videos</p>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              placeholder="Full name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              id="username"
              value={userName}
              placeholder="Username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="phone"
              name="phoneNo"
              id="phone"
              value={phoneNo}
              placeholder="phone"
              onChange={(e) => {
                setPhoneNo(e.target.value);
              }}
            />
          </div>
          <input
             type= "submit"  id = "signIn" value ="Sign Up" onClick={postData}/>     
            
        </div>
        <div className="form2">
          Already have an account ?
          <Link to="/singIn">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
          </Link>
         
        </div>
      </div>
    </div>
  );
}
