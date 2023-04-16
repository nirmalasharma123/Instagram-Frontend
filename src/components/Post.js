
import React, { useState } from "react";
import "./post.css";
import { Link, useNavigate } from "react-router-dom";


import axios from "axios";
export default function Post() {
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState(null);

  const postDetails = async function () {
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("photo", photo);

    try {
      const response = await axios.post(
        "https://instagrambackend.onrender.com/creatPost",
        formData,
        {
          headers: {
            "x-api-key": localStorage.getItem("token"),
          },
        }
      );
      console.log(formData);
      alert("successful");
      navigate("/");
    } catch (error) {
      console.log(error.response);
      alert(error.response.data);
    }
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = function (e) {
      const output = document.getElementById("output");
      output.src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <div className="card"> 
        <div className="creat-post">
      {/* headder */}
      <div className="post-headder">
        <h4 style={{ margin: "3px auto" }}>Create post</h4>
        <button id="post-btn" onClick={postDetails}>
          Share
        </button>
      </div>
      {/*imag */}
      <div className="main-div">
        <img
          id="output"
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
        />
      </div>
      {/* details*/}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img src={photo && URL.createObjectURL(photo)} alt="" />
          </div>
        </div>
        <textarea
          value={caption}
          onChange={handleCaptionChange}
          type="text"
          placeholder="Write caption..."
        ></textarea>
      </div>
    </div>
    </div>
   
  );
}
