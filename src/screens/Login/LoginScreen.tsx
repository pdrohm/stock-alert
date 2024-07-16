// src/screens/LoginScreen.tsx
import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {useAuth} from '../../context/AuthContext';

const LoginScreen: React.FC = () => {
  const {login} = useAuth();

  return (
    <View style={styles.container}>
      <Button title="Log in" onPress={login} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default LoginScreen;
