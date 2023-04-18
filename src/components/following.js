import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Following() {
  const params = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/following/${params.id}`, {
        headers: {
          'x-api-key': localStorage.getItem('token')
        }
      })
      .then((res) => {
        setUserDetails(res.data.data.userDetails);
        setFollowing(res.data.data.following);
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
      <h3>Following</h3>
      <hr></hr>
      {following.length > 0 ? (
        following.map((following) => (
          <div key={following._id} className='profile-data'>
            <img   className='profilePic' src={following.profilePic} alt="Profile Pic" />
            <Link to={`/getUserByProfileId/${following._id}`}>
            <h4>{following.profileOf.userName}</h4>
              </Link>
          </div>
        ))
      ) : (
        <div>No following to display.</div>
      )}
    </div>
  );
}
