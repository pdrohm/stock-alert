// src/context/AuthContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import {useAuth0} from 'react-native-auth0';
import {URL_AUTH0_REDIRECT_URI} from '@env';

interface AuthContextData {
  user: object | null;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {authorize, clearSession, user} = useAuth0();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log('user', user);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = async () => {
    try {
      await authorize({
        scope: 'openid profile email offline_access',
        redirectUrl: URL_AUTH0_REDIRECT_URI,
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      await clearSession({
        federated: true,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{user, login, logout, isAuthenticated}}>
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
