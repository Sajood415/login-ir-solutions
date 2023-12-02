import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/bg-img.jpg';
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      const user = await loginApi(username, password);

      if (user) {
        login(user);
        navigate('/');
      } else {
        toast.error('Invalid credentials', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Error during login. Please try again.', { position: 'top-right' });
    }
  };

  return (
    <div className="container">
      <div className="left-box">
        <img src={Logo} alt="Logo" className="logo-img" />
        <div className="welcome-text">
          <span className="welcome-line">Welcome</span>
          <span className="back-line">back</span>
        </div>
        <div className="additional-info">
          <p className="info-line">
            You need to be signed in to access the project dashboard.
          </p>
        </div>
        <form className="form">
          <label className="label" htmlFor="username">
            Email or username:
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              placeholder="Enter your email or username"
            />
          </label>
          <label className="label" htmlFor="password">
            Password:
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Enter your password"
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </span>
            </div>
          </label>
          <div className="remember-forgot">
            <div className="remember">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe" className="checkbox-label">
                Keep me signed in
              </label>
            </div>
            <div className="forgot-password">
              <span className="forgot-link">Forgot password?</span>
            </div>
          </div>
          <button type="button" onClick={handleLogin} className="button">
            Sign In
          </button>
        </form>
      </div>
      <div className="right-image">
        <img src={bgImage} alt="Right Image" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
