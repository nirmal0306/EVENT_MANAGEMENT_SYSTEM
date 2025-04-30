import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:2000/api/auth/register', { username, email, password });
      console.log(res.data);
      navigate('/login');
      // Redirect or show a success message as needed
    } catch (error) {
      console.error(error.response.data);
      alert("registration failed");
    }
  };

  return (
    <div className="register-container"  style={{marginLeft:'462px'}}>
      <h2 style={{marginLeft: '20px' }}>Register</h2>
      <form className='form0' onSubmit={handleSubmit}>
      <div style={{marginLeft: '05px' }} className="col-lg-4 mt-2 mb-2">
          
          <input type="text" placeholder="Username" className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div style={{marginLeft: '05px' }} className="col-lg-4 mt-2 mb-2">
  
          <input type="email" placeholder="Email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div style={{marginLeft: '05px' }} className="col-lg-4 mt-2 mb-2">
  
          <input type="password" placeholder='Password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button style={{marginLeft: '20px' }} className="btn btn-primary" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
