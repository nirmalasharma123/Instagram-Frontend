



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./comments.css";
import { Link } from "react-router-dom";


export default function CommentsPage() {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`https://instagrambackend.onrender.com/getComment/${params.postId}`, {
        headers: {
          "x-api-key": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setPost(res.data.data[0]);
        setComments(res.data.data.slice(1));
        
      })
      .catch((err) => {
        console.log(err);
        alert(err.data.message)
      });
  }, [params.postId]);

  const [replies, setReplies] = useState({});
  const toggleReplies = (commentId) => {
    setReplies((prevReplies) => ({
      ...prevReplies,
      [commentId]: !prevReplies[commentId],
    }));
  };

  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = (commentId) => {
    axios
      .post(
        `https://instagrambackend.onrender.com/reply/${commentId}`,
        {
          text: replyText,
        },
        {
          headers: {
            "x-api-key": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? { ...comment, replyCount: comment.replyCount + 1 }
              : comment
          )
        );
        setReplyText("");
        alert("Reply posted successfully");
      })
      .catch((err) => {
        console.log(err);
        
      });
  };

  //delet comment 

  const handleDeleteComment = (commentId) => {
    axios
      .delete(`https://instagrambackend.onrender.com/deletComment/${commentId}`, {
        headers: {
          "x-api-key": localStorage.getItem("token"),
        },
      })
      .then((res) => {
    
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
        alert("Comment deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  return (
    <div>
      <p>
        <img   src={post.profilePic}  alt=""/>
        {post.postedBy && post.postedBy.userName && (
           <Link to={`/findUserBypostId/${post._id}`}><h2>{post.postedBy.userName}:</h2></Link>
           
        
        )}<h4>{post.caption}</h4>
        <hr></hr>

        <h2>comments</h2>
      </p>
      {comments.length != 0 ? (
        comments.map((comment) => (
          <div key={comment._id}>
            <p>
              {comment.userId && comment.userId.userName && (
               

                <strong>{comment.userId.userName}: </strong>
            
              )}
              {comment.text}
            </p>
            <button onClick={() => toggleReplies(comment._id)}>
              {replies[comment._id] ? "Hide Replies" : "View Replies"}
            </button>
            <br></br>
            <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
            {replies[comment._id] && (
              <div>
                {comment.reply &&
                  comment.reply.map((reply) => (
                    <div key={reply._id}>
                      <p>
                        {reply.userId && reply.userId.userName && (
                          <strong>{reply.userId.userName}: </strong>
                        )}
                        {reply.text}
                      </p>
                    </div>
                  ))}
              
                <p>{`Replies: ${comment.replyCount}`}</p>
                <p>{comment.reply.text}</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleReplySubmit(comment._id);
                  }}
                >
                  <input
                    type="text"
                    placeholder="Type your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button type="submit">Post Reply</button>
                </form>
              </div>
            )}
          </div>
        ))
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}
