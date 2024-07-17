import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import {useAuth0} from 'react-native-auth0';
import {
  URL_AUTH0_REDIRECT_URI_IOS,
  URL_AUTH0_LOGOUT_REDIRECT_URI_IOS,
  URL_AUTH0_REDIRECT_URI_ANDROID,
  URL_AUTH0_LOGOUT_REDIRECT_URI_ANDROID,
} from '@env';
import {User} from '../types/UserTypes';
import {Platform} from 'react-native';

const redirectUri =
  Platform.OS === 'ios'
    ? URL_AUTH0_REDIRECT_URI_IOS
    : URL_AUTH0_REDIRECT_URI_ANDROID;
const logoutRedirectUri =
  Platform.OS === 'ios'
    ? URL_AUTH0_LOGOUT_REDIRECT_URI_IOS
    : URL_AUTH0_LOGOUT_REDIRECT_URI_ANDROID;

interface AuthContextData {
  user: User | null;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  dummyLogin: () => void;
  dummyLogout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {authorize, clearSession, user: auth0User} = useAuth0();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log(auth0User);

  useEffect(() => {
    if (auth0User) {
      setUser(auth0User);
      setIsAuthenticated(true);
    } else if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [auth0User, user]);

  const login = async () => {
    try {
      await authorize({
        redirectUrl: redirectUri,
      });
      setUser(auth0User);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      await clearSession({returnToUrl: logoutRedirectUri});
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const dummyLogin = () => {
    const dataDummyUser: User = {
      email: 'dummy@user.com',
      emailVerified: true,
      familyName: 'User',
      givenName: 'Dummy',
      name: 'Dummy User',
      nickname: 'dummyuser',
      picture:
        'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
      sub: 'dummy|1234567890',
      updatedAt: new Date().toISOString(),
    };
    setUser(dataDummyUser);
  };

  const dummyLogout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{user, login, logout, isAuthenticated, dummyLogin, dummyLogout}}>
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
