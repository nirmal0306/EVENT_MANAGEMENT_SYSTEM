import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Assuming you're handling a password
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
    onLogin(username);
    navigate('/admin/dashboard'); // Redirect to admin dashboard upon successful login
    }
    else
    {
      alert('Invalid username or password');
      console.log('Invalid username or password');
    }
  };

  return (
    <div className="container" style={{marginLeft:'450px'}}>
      <h2 style={{marginLeft: '20px' }}>Admin Login</h2>
      <form className='form0' onSubmit={handleSubmit}>
      <div style={{marginLeft: '05px' }} className="col-lg-3 mt-2 mb-2">       
          <input
            type="text"
            className="form-control"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
          <div style={{marginLeft: '05px' }} className="col-lg-3 mt--2 mb--2">
          <input
            type="password"
            className="form-control"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button style={{marginLeft: '20px', marginTop: '15px' }} type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
