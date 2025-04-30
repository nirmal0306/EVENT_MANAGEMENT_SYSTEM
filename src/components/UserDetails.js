import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserDetails = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    if (!username) {
      alert("user not logged in !!");
      navigate('/login');
    }
    
    if (username) {
      axios
        .get(`http://localhost:2000/user/userdetails/${username}`)
        .then((response) => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('There was an error fetching the user data!', error);
          setLoading(false);
        });
    }
  }, [username, navigate]);

  if (loading) return <div>Loading...</div>;
  if (!userData) return <div>No user data found</div>;

  return (
    <div>
      <h1>User Details</h1>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      {/* <Link to='/feedback'><button className="btn btn-success">Feed back</button></a> */}
      <Link to="/feedback" className="btn btn-primary">Give Feedback</Link>
    </div>
  );
};

export default UserDetails;