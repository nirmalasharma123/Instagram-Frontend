import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './followers.css'

export default function Followers() {
  const params = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://instagrambackend.onrender.com/followers/${params.id}`, {
        headers: {
          'x-api-key': localStorage.getItem('token')
        }
      })
      .then((res) => {
        setUserDetails(res.data.data.userDetails);
        setFollowers(res.data.data.followers);
        console.log(res.data.data)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
          <div className='profile-data-user'>
        <img  className='profilePic ' src={userDetails.profilePic} alt="Profile Pic" />
         <h2>{userDetails.userNam}</h2>
      </div>
      <h3>Followers</h3>
      <hr></hr>
      {followers.length > 0 ? (
        followers.map((follower) => (
          <div key={follower._id} className='profile-data'>
            <img   className='profilePic' src={follower.profilePic} alt="Profile Pic" />
            <Link to={`/getUserByProfileId/${follower._id}`}>
            <h4>{follower.profileOf.userName}</h4>
              </Link>
          </div>
        ))
      ) : (
        <div>No followers to display.</div>
      )}
    </div>
  );
}
