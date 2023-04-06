import React, { useState } from 'react';
import "./signIn.css";
import logo from "../img/singLogo.png";
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function SingIn() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const[token,setToken]= useState("")

  const postData= async function(){
    const data=  await  axios.post("http://localhost:3001/login",{
      email,
      password,
    

  }).then((res)=>{
    console.log(res.data)
    setToken(res.data.token)
    
    localStorage.setItem("token",JSON.stringify(token))
    alert("sucessful")
  }).catch((err)=>{
    console.log(err)
  })

};
  return (
    <div className='singIn'>
        <div>
            <div className='logInForm'>
            <img  className="singUpLogo"  src={logo} alt=""/>
            <div>
            <input type = "email" name= "email" id="email"  placeholder='Email'  onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
            <input type = "password" name= "password" id="password" placeholder='Password'  onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <button
            type= "submit"  id = "logIn"   onClick={postData} value ="Sign In"></button>
        
                 
            </div>
            <div className='loginForm2'>
                Don't have an account ?
                <Link to = "/singUP"><span  style={{color :"blue",cur:"pointer"}}>SingUp</span> </Link>
             </div>
        </div>
      
    </div>
  )
}
