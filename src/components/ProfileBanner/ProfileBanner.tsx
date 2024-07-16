import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useAuth} from '../../context/AuthContext';
import {styles} from './styles';
const ProfileBanner: React.FC = () => {
  const {user, logout} = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome {user?.givenName}</Text>
        <Text style={styles.userName}>{user?.name}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: user?.picture}} style={styles.userImage} />
        <TouchableOpacity style={styles.logoutIcon} onPress={logout}>
          <FontAwesome name="sign-out" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileBanner;
