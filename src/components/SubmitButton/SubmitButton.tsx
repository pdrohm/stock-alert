import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

interface SubmitButtonProps {
  title: string;
  onPress: () => void;
}

const SubmitButton = ({title, onPress}: SubmitButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
