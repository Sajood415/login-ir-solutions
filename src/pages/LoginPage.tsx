// LoginPage.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/bg-img.jpg';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const user = await loginApi(username, password);

    if (user) {
      login(user);
      navigate('/');
    } else {
      console.log('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container">
      <div className="left-box">
        <h2>Login Page</h2>
        <form className="form">
          <label className="label">
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
          </label>
          <label className="label">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </label>
          <button type="button" onClick={handleLogin} className="button">
            Login
          </button>
        </form>
      </div>
      <div className="right-image">
        <img src={bgImage} alt="Right Image"/>
      </div>
    </div>
  );
};

export default LoginPage;
