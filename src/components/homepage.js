import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./othersPrfie"

import "./home.css";

export default function Homepage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [likedPosts, setLikedPosts] = useState([]);

  function handleChange(e) {
    setComment(e.target.value);
  }

  const submitComment = (post) => {
    console.log(comment);
    axios
      .post(
        `https://instagrambackend.onrender.com/creatComment/${post._id}`,
        { text: comment },
        {
          headers: {
            "x-api-key": token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("comment added");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const likePost = (post) => {
    localStorage.getItem(token)
    axios
      .post(
        `https://instagrambackend.onrender.com/like/${post._id}`,{},
        
        {
          headers: {
            "x-api-key": token
          }
        }
      )
      .then((res) => {
        console.log(res.data);
        setLikedPosts([...likedPosts, post._id])
        alert(res.data.message)
        ;
      })
      .catch((err) => {
        console.log(token)
        console.log(err);
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/signIn");
      return;
    }
    axios
      .get("https://instagrambackend.onrender.com/getPosts", {
        headers: {
          "x-api-key": token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/signIn");
    }
  });

  return (
    <div className="Home">
      {posts.map((post) => (
        <div key={post.id}>
          <img src={post.postedBy.profilePic} alt="" />
          
          <Link to={`/findUserBypostId/${post._id}`}><h5>{post.postedBy.userName}</h5></Link>
          <img src={post.photo} alt="" />
          <span
            className={`material-symbols-outlined ${
              likedPosts.includes(post._id) ? "liked" : ""}`}
            onClick={() => likePost(post)}
          >
            favorite
          </span>
          <p>{post.likesCount} likes</p>
          <p>{post.caption}</p>

          <Link to={`/getComment/${post._id}`}><span className="material-symbols-outlined"> add_reaction </span></Link>          
           <input onChange={handleChange} className="commentss" type="text" placeholder="Add a comment" /><p>{post.commentsCount} comments</p>
            <button onClick={()=>submitComment(post)} className="post-comment">post</button>
            
          
        </div>
      ))}
    </div>
  );
}

