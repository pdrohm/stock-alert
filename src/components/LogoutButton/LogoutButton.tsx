// src/components/LogoutButton.tsx
import React from 'react';
import {Button} from 'react-native';
import {useAuth0} from 'react-native-auth0';

const LogoutButton: React.FC = () => {
  const {clearSession} = useAuth0();

  const onPress = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log(e);
    }
  };

  return <Button onPress={onPress} title="Log out" />;
};

export default LogoutButton;
