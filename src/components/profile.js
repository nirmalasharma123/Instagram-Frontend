import React from 'react'
import './profile.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import SetProfilePic from './setProfilePic';


export default function Profile() {
 const [data, setData] = useState('');
 const [chngePic,setProfilePic]=useState(false)

 useEffect(() => {
   axios.get('http://localhost:3001/myProfile', {
    
     headers: {
       'x-api-key': localStorage.getItem('token')
     }
   })
   .then(res => {
     console.log(res.data.data)
     setData(res.data.data)
        })
   .catch(err => {
     console.log(err);
   });
 }, []);


 const cahngeProfile=()=>{
  if(chngePic){
    setProfilePic(false)
  }else{
    setProfilePic(true)
  }
 }

 const deletePost = postId => {
  
  axios
    .delete(`https://instagrambackend.onrender.com/deletePost/${postId}`, {


      headers: {
        'x-api-key': localStorage.getItem('token')
      }
    })
    .then(res => {
      
      console.log(res.data.data)
      setData(res.data.data)
      window.location.reload()
    })
    .catch(err => {
      console.log(err);
    });
};

  
 if(data==""){ 
   return <h1>Loading</h1>}


   else{
 return (

  <>{ data?
     <div className='profile'>
       <div className='profile-frame'>
         <div className='profile-pic'>
          
           <img   onClick ={cahngeProfile} src={data.profilePic} alt='Profile Picture' />
         </div>
         <div className='profile-data'>
           <h1>{data.profileOf.userName}</h1>
           <div className='profile-info' style={{ display: 'flex' }}>
          <div> <Link to={`/followers/${data._id}`}><p>{data.followersCount} followers</p></Link></div>&nbsp;&nbsp;&nbsp;
          <div> <Link to={`/following/${data._id}`}><p>{data.followingCount} following</p></Link></div>&nbsp;&nbsp;&nbsp;
             <p>{data.postCount} posts</p>
             {
            chngePic &&
           < SetProfilePic profileId={data._id}/>
          }
        
           </div>
           <p>{data.bio}</p>
           
         </div>
       </div>
       <hr
         style={{
           width: '90%',
           margin: 'auto',
           opacity: '0.8',
           margin: '24px auto'
         }}
       />

        
         {data.posts.map(post=><div >      
            <div style={{maxiumWidth:"20rem",boxShadow:"5px 5px 10px black"}}>
            <img  style={{marginTop:"5px",width:"10rem"}} src={post.photo}/>
            <h4> <span class="material-symbols-outlined">favorite</span> {post.likesCount} </h4>
            <Link to={`/getComment/${post._id}`}><span className="material-symbols-outlined"> add_reaction</span></Link>
            <p>{post.commentsCount}</p>
            <p>{post.caption} </p>
          
            <button onClick={() => deletePost(post._id)}>Delete Post</button>
            <hr></hr>
            </div>  
  
          </div> )}
          
       </div>:<h1>Loading</h1>}
       </>
     
 )
 
}
}