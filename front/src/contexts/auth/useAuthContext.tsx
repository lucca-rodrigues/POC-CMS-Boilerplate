/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

interface IAuthContext {
  token: string;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  signOut: () => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  handleGlobalLoader: () => void;
  handleGlobalLoaderNavigation: () => void;
  setUserToken: (token: string) => void;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  token: '',
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  signOut: () => {},
  isLoading: true,
  setIsLoading: () => {},
  handleGlobalLoader: () => {},
  handleGlobalLoaderNavigation: () => {},
  setUserToken: () => {},
});

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(Cookies.get('token') ?? '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function setUserToken(token) {
    if (token) {
      Cookies.set('token', token);
      setToken(token);
      setIsAuthenticated(true);
    }
  }

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) {
      handleGlobalLoader();
    }
  }, [isAuthenticated]);

  const handleGlobalLoader = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleGlobalLoaderNavigation = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const signOut = () => {
    handleGlobalLoader();
    Cookies.remove('token');
    setTimeout(() => {
      setIsAuthenticated(false);
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  //  useEffect(() => {
  //    if (user && token) {
  //      setIsAuthenticated(true);
  //    }
  //  }, [user, token]);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        setIsAuthenticated,
        signOut,
        isLoading,
        setIsLoading,
        handleGlobalLoader,
        handleGlobalLoaderNavigation,
        setUserToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
