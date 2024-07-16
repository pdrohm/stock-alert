import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../../context/AuthContext';
import {styles} from './styles';

const LoginScreen: React.FC = () => {
  const {login} = useAuth();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.loginButton} onPress={login}>
        <MaterialIcons name="login" size={24} color="#fff" />
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
