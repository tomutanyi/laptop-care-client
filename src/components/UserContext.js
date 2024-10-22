// src/components/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the UserContext
export const UserContext = createContext();

// Create a UserProvider to wrap the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from localStorage on initial load
  useEffect(() => {
    const storedUser = {
      access_token: localStorage.getItem('access_token'),
      id: localStorage.getItem('id'),
      username: localStorage.getItem('username'),
      role: localStorage.getItem('role'),
    };
    
    if (storedUser.username) {
      setUser(storedUser); // Only set user if username is present
    }
  }, []);

  // Function to handle login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('access_token', userData.access_token);
    localStorage.setItem('id', userData.id);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('role', userData.role);
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
