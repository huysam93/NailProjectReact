import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('nananail_auth'));
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      await apiClient.post('/login', { username, password });
      sessionStorage.setItem('nananail_auth', 'true');
      setIsAuthenticated(true);
      navigate('/admin');
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('nananail_auth');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);