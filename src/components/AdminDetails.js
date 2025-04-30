import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDetails = ({ adminUsername }) => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    if (!adminUsername) {
      console.log("Admin not logged in.");
      alert('Admin not logged in.');
      navigate('/admin/login');
      return;
  }
    if (adminUsername) {
      axios
        .get(`http://localhost:2000/api/admin/admindetails/${adminUsername}`)
        .then((response) => {
          alert("For Privarcy Concern the password is encrypted !!");
          setAdminData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('There was an error fetching the admin data!', error);
          setLoading(false);
        });
    }
  }, [adminUsername]);

  if (loading) return <div>Loading...</div>;
  if (!adminData) return <div>No admin data found</div>;

  return (
    <div>
      <h1>Admin Details</h1>
      <p><strong>Username:</strong> {adminData.adminUsername}</p>
      <p><strong>Password:</strong> {adminData.password}</p>
      {/* Add more admin details as needed */}
    </div>
  );
};

export default AdminDetails;
