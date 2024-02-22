import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginPage.css'; // Import custom styles

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate(); // Initialize useHistory hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/api/v2/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setLoginStatus('Invalid username or password. Please try again.');
      } else {
        const responseData = await response.json();
        const {token, refreshToken, message} = responseData;
  
        if (message != null) {
          setLoginStatus(message);
        } else {
          setLoginStatus('Login successful');
          navigate('/profile',{ state: { token: token, refreshToken: refreshToken }});
        }
      }
    } catch (error) {
      setLoginStatus('Catch an error: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      {loginStatus && (
        <div className="alert alert-failed">
          <p>{loginStatus}</p>
        </div>
      )}
      <div className="login-header">Login</div>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="input-field"
          type="email"
          id="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="input-field"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
      <div className="signup-text">
        Don't have an account? <a className="signup-link" href="/register">Sign up</a>
      </div>
    </div>
  );
};

export default LoginPage;
