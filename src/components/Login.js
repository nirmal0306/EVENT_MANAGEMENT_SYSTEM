import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:2000/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            onLogin(username);
            navigate('/homeUser');
        } catch (err) {
            setError('Login failed: ' + (err.response ? err.response.data.msg : 'Server error'));
        }
    };
        
    return (
        <div className='container' style={{marginLeft:'450px'}}>
            
            <div className="login-container">
                <h2 style={{marginLeft: '20px' }}>Login</h2>
                <form className='form0' id="loginForm" onSubmit={loginHandler}>
                <div style={{marginLeft: '05px' }} className="col-lg-3 mt-2 mb-2">
                    <input
                        type="text"
                        placeholder="Username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    </div>
                    {/* <br /> */}
                    <div style={{marginLeft: '05px' }} className="col-lg-3 mt--2 mb--2">
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </div>
                    {/* <br /> */}
                    <button style={{marginLeft: '20px', marginTop: '15px' }} className="btn btn-primary" type="submit">Login</button>
                    {error && <span className="error">{error}</span>}
                </form>
            </div>
        </div>
    );
}

export default Login;
