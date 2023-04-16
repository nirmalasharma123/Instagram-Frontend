import './App.css';
import Navbar from './components/navbar';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React,{useState,useEffect,useContext} from 'react';
import Followers from './components/Followers';
import Home from './components/homepage';
import SingUP from './components/singUP';
import SingIn from './components/singIn';
import Profile from './components/profile.js';
import Post from './components/Post';
import Getprofile from "./components/othersPrfie";
import GetComment from "./components/GetComments";
import SerchUser from './components/SerchUser';
import GetUserByProfileId from "./components/Profileget"
import Following from './components/following.js';
export const authContext = React.createContext({});

function App() {

  const [userLogin,setUserLogin] = useState(null)


  useEffect(()=>{
    if(localStorage.getItem('token')) loggedIn(localStorage.getItem('token'))
 },[])
  function loggedIn(token){
    setUserLogin(token)
 }
 function loggedOut(){
   setUserLogin(null)
 }

  return (
  <BrowserRouter>

  <authContext.Provider
    
    value={{userLogin,isLoggedIn:Boolean(userLogin),loggedOut,loggedIn}}>
    <div className="App">

      <Navbar/>
      <br/>
      <br/>
      <Routes>
        <Route path ="/" element={<Home/>}></Route>
        <Route path ="/singUP" element={<SingUP/>}></Route>
        <Route path ="/singIn" element={<SingIn/>}></Route>
        <Route path ="/profile" element={<Profile/>}></Route>
        <Route path ="/CreatePost" element={<Post/>}></Route>
        <Route path ="/getUser" element={<Getprofile/>}></Route>
        <Route path ="/findUserByPostId/:id" element={<Getprofile/>}></Route>
        <Route path ="/GetComment/:postId" element={<GetComment/>}></Route>
        <Route path ="/followers/:id" element={<Followers/>}></Route>
        <Route path ="/userProfile" element={<SerchUser/>}></Route>
        <Route path ="/getUserByProfileId/:id" element={<GetUserByProfileId/>}></Route>

        
        <Route path ="/following/:id" element={<Following/>}></Route>
      </Routes>
      <ToastContainer theme="dark"/>
    </div>
    </authContext.Provider>
    </BrowserRouter>
  );
}

export default App;
