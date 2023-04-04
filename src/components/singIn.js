import React from 'react';
import "./signIn.css";
import logo from "../img/singLogo.png";
import { Link } from 'react-router-dom';



export default function singIn() {
  return (
    <div className='singIn'>
        <div>
            <div className='logInForm'>
            <img  className="singUpLogo"  src={logo} alt=""/>
            <div>
            <input type = "email" name= "email" id="email" placeholder='Email'/>
            </div>
            <div>
            <input type = "password" name= "password" id="password" placeholder='Password'/>
            </div>
            <input
             type= "submit"  id = "logIn" value ="Sign In"/>
        
                 
            </div>
            <div className='loginForm2'>
                Don't have an account ?
                <Link to = "/singUP"><span  style={{color :"blue",cur:"pointer"}}>SingUp</span> </Link>
             </div>
        </div>
      
    </div>
  )
}
