import React ,{useEffect,useState}from 'react';
import logo from "../img/singLogo.png";
import "./singUp.css";
import { Link } from 'react-router-dom';

export default function SingUP() {
  const [name,setName]= useState("");
  const [email,setEmail]=useState("");
  const [userName,setUserName]=useState("");
  const [password,setPassword]=useState("");
  const [phone,setPhone]=useState("");

  const postData=()=>{
    fetch("http://localhost:3001/singUp",{
      method:"post",
      headers:{
        "content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,
        email:email,
        userName:userName,
        email:email,
        password:password


      })
    }).then(res=>res.json())
    .catch((err)=>err.message)
  }


  return (
    <div className="singUp">
        <div className='form-container'>
            <div className='form'>
          <img  className="singUpLogo"  src={logo} alt=""/>
          <p >
            Sign up to see photos and videos
          </p>
          <div>
            <input type = "email" name= "email" id="email" value={email}  placeholder='Email'   onChange={(e)=>{setEmail(e.target.value)}}/>
          </div>
          <div>
            <input type = "text" name= "name" id="name"  value={name}    placeholder='Full name'  onChange={(e)=>{setName(e.target.value)}}/>
          </div>
          <div>
            <input type = "text" name= "username" id="username" value={userName} placeholder='Username'  onChange={(e)=>{setUserName(e.target.value)}}/>
          </div>
          <div>
            <input type = "password" name= "password" id="password"  value={password} placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>
          <div>
            <input type = "phone" name= "phone" id="phone"  value={phone} placeholder='phone' onChange={(e)=>{setPhone(e.target.value)}}/>
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
