import React from 'react';
import {View, TouchableOpacity, Text, Platform} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../../context/AuthContext';
import {styles} from './styles';

const LoginScreen: React.FC = () => {
  const {login, dummyLogin} = useAuth();

  const handleLogin = () => {
    if (Platform.OS === 'ios') {
      login();
    } else {
      dummyLogin();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <MaterialIcons name="login" size={24} color="#fff" />
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
