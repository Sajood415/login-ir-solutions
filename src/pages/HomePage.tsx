import React from 'react';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      <h2>Home Page</h2>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.firstName} {user?.lastName}!</p>
          <p>Gender: {user?.gender}</p>
        </div>
      ) : (
        <p>You are not authenticated. Please login to access the home page.</p>
      )}
    </div>
  );
};

export default HomePage;