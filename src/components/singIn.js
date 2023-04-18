import React, { useState, useEffect, useContext } from "react";
import "./signIn.css";
import logo from "../img/singLogo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../App";

export default function SingIn() {
  const { isLoggedIn, loggedIn } = useContext(authContext);
  const Navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const[token,setToken]= useState("")

  const postData = async function () {
    const data = await axios
      .post("http://localhost:3001/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.token.userId);
        loggedIn(res.data.token);
        alert("successful");
        Navigate("/");
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.message);
      });
  };
  useEffect(() => {
    if (isLoggedIn) {
      alert("already logged in");
      Navigate("/");
    }
  }, []);
  return (
    <div className="singIn">
      <div>
        <div className="logInForm">
          <img className="singUpLogo" src={logo} alt="" />
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <input type="submit" id="logIn" value="Sign In" onClick={postData} />
        </div>
        <div className="loginForm2">
          Don't have an account ?
          <Link to="/singUP">
            <span style={{ color: "blue", cur: "pointer" }}>SingUp</span>{" "}
          </Link>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
}
