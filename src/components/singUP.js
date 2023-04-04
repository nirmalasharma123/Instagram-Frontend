import React from 'react';
import logo from "../img/singLogo.png";
import "./singUp.css";
import { Link } from 'react-router-dom';

export default function SingUP() {
  return (
    <div className="singUp">
        <div className='form-container'>
            <div className='form'>
          <img  className="singUpLogo"  src={logo} alt=""/>
          <p >
            Sign up to see phtos and vedios
          </p>
          <div>
            <input type = "email" name= "email" id="email" placeholder='Email'/>
          </div>
          <div>
            <input type = "text" name= "name" id="name" placeholder='Full name'/>
          </div>
          <div>
            <input type = "text" name= "username" id="username" placeholder='Username'/>
          </div>
          <div>
            <input type = "password" name= "password" id="password" placeholder='Password'/>
          </div>
          <div>
            <input type = "phone" name= "phone" id="phone" placeholder='phone'/>
          </div>
          <input type="submit" id="submit-btn" value ="Sign Up"/>

        
        </div>
        <div className='form2'>
            Already have an account ? 
            <Link to ="/singIn">         
              <span style={{color:"blue",cursor:"pointer"}}>Sign In</span>
              </Link>
 
        </div>
        </div>
    </div>
  )
}
