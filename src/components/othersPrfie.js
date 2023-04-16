import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./other.css";

export default function UserProfile() {
  const params = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [following, setFollowing] = useState(false);


  useEffect(() => {
    axios
      .get(`https://instagrambackend.onrender.com/findUserBypostId/${params.id}`, {
        headers: {
          "x-api-key": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUserProfile(res.data.data);
        setFollowing(res.data.data.isFollowing);
        console.log(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const likePost = (post) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `https://instagrambackend.onrender.com/like/${post._id}`,
        {},
        {
          headers: {
            "x-api-key": token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setLikedPosts([...likedPosts, post._id]);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(token);
        console.log(err);
      });
  };

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  const submitComment = (post) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `https://instagrambackend.onrender.com/creatComment/${post._id}`,
        {
          text: commentText,
        },
        {
          headers: {
            "x-api-key": token,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        alert(res.data.message);
        setCommentText("");
      })
      .catch((err) => {
        console.log(token);
        console.log(err);
        
      });
  };

  const toggleFollow = () => {
    
    const token = localStorage.getItem("token");
    axios
      .post(
        `https://instagrambackend.onrender.com/follow/${userProfile._id}`,
        {},
        {
          headers: {
            "x-api-key": token,
          },
        }
      )
      .then((res) => {
        alert(res.data.message)
        setFollowing(!following);
      })
      .catch((err) => {
  
        console.log(err);
      });
  };


  return (
    <div  >
      {userProfile ?
    <div >
      <img  className="pic" src={userProfile.profilePic} alt="Profile Picture" />
      <h1>{userProfile.profileOf.userName}</h1>
      <div className="profile-info" >
        <Link to={`/followers/${userProfile._id}`}><p>{userProfile.followersCount} followers</p></Link>&nbsp;&nbsp;&nbsp;
        <Link to={`/following/${userProfile._id}`}><p>{userProfile.followingCount} following</p></Link>&nbsp;&nbsp;&nbsp;
        
        <p>{userProfile.postCount} posts</p>
        <button onClick={toggleFollow} className="followButton">
          {following ? "Unfollow" : "Follow"}</button>
      </div>
      <div><p>{userProfile.bio}</p></div>
      <hr></hr>
      <div className="profile">
        {userProfile.posts.map((post) => (
          <div key={post._id} className="post-card">
           <img src={post.photo} alt="" />
            <div style={{ display: "flex" }}> </div>
            <p>
              {post.likesCount}{" "}
              <span
                className={`material-symbols-outlined like-button ${
                  likedPosts.includes(post._id) ? "liked" : ""
                }`}
                onClick={() => likePost(post)}
              >
                favorite
              </span>
            </p>{" "}
            <p className="comment-count">
              {post.commentsCount}{" "}
              <Link to={`/getComment/${post._id}`}><span className="material-symbols-outlined"> add_reaction </span></Link>
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p>{post.caption}</p>

              <input
                onChange={handleCommentTextChange}
                className="comment-input"
                type="text"
                placeholder="Add a comment"
              />
              <button
                onClick={() => submitComment(post)}
                className="post-comment"
              >
                post
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>:<h1>Loading</h1>}
    </div>
  );
}
