import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = (callback) => {
    setIsAuthenticated(true);
    if (typeof callback === 'function') {
      callback();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
