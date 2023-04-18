import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function SetProfilePic({ profileId }) {
  const hiddenFileInput = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);

  useEffect(() => {
    axios
      .get(`https://instagrambackend.onrender.com/profile/${profileId}`)
      .then((res) => {
        setProfilePicUrl(res.data.data.profilePic);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, [profileId]);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      axios
        .post(`https://instagrambackend.onrender.com/updateProfile/${profileId}`, formData, {
          headers: {
            "x-api-key": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setProfilePicUrl(res.data.Location);
          alert("profile pic upload successfull");
          window.location.reload()
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
  };

  return (
    <div
      className="profilePic-upload"
      style={{
        backgroundColor: "pink",
        borderRadius: "10px",
        padding: "2px",
        boxShadow: "none",
      }}
    >
      <div chnage="changePic centered">
        <div>
          <h3>Change Profile Pic</h3>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button
            className="upload-btn"
            style={{ color: "#1EA1F7" }}
            onClick={handleClick}
          >
            Upload Photo
          </button>
          <input
            type="file"
            accept="image/*"
            style={{ borderTop: "1px solid #00000030" }}
            ref={hiddenFileInput}
            onChange={handleFileChange}
          />
          <button
            className="upload-btn"
            style={{ color: "#1EA1F7" }}
            onClick={handleUpload}
          >
            Save
          </button>
        </div>
      </div>
      {profilePicUrl ? (
        <div>
          <img
            src={profilePicUrl}
            alt="Profile Pic"
            style={{ width: "100%", height: "auto" }}
          />
          <div style={{ borderTop: "1px solid #00000030" }}>
            <button
              className="upload-btn"
              style={{ color: "#ED4956" }}
            ></button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <button
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "15px",
        }}
        onClick={handleCancel}
      >
        Cancel
      </button>
    </div>
  );
}
