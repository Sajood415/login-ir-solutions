const API_BASE_URL = 'https://dummyjson.com/auth';

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

export const loginApi = async (username: string, password: string): Promise<User | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (data.id) {
        return {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          image: data.image,
          token: data.token,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    }
  };