import React from 'react';
import {useAuth} from '../context/AuthContext';
import AppNavigator from './AppNavigator';
import LoginScreen from '../screens/Login/LoginScreen';

const Routes: React.FC = () => {
  const {isAuthenticated} = useAuth();

  return isAuthenticated ? <AppNavigator /> : <LoginScreen />;
};

export default Routes;
