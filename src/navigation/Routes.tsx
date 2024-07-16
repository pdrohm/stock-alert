import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../context/AuthContext';
import AppNavigator from './AppNavigator';
import LoginScreen from '../screens/Login/LoginScreen';

const Routes: React.FC = () => {
  const {isAuthenticated} = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <LoginScreen />}
    </NavigationContainer>
  );
};

export default Routes;
