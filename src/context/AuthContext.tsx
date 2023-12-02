import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        // const decodedToken = JSON.parse(atob(storedToken.split('.')[1])) as User;
        return true;
      } catch (error) {
        console.error('Error decoding the token:', error);
        localStorage.removeItem('authToken');
      }
    }
    return false;
  });
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setAuthenticated(true);
    setUser(userData);
    localStorage.setItem('authToken', userData.token);
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
