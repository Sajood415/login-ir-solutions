import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const HomePage: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('User logged out successfully.', { position: 'top-right' });
  };

  return (
    <div>
      <h2>Home Page</h2>
      {isAuthenticated ? (
        <div>
          <p>Welcome</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>You are not authenticated. Please login to access the home page.</p>
      )}
    </div>
  );
};

export default HomePage;
