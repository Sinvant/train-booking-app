import React, { createContext, useContext, useState, useCallback } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await authAPI.login(email, password);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await authAPI.register(name, email, password);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    authAPI.logout();
  }, []);

  const initializeAuth = useCallback(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    initializeAuth,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
