import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {themeColor} from '../../styles/theme';

const SubmitBtn = ({onPress, title}) => {
  const handlePress = () => {
    onPress();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SubmitBtn;

const styles = StyleSheet.create({
  button: {
    backgroundColor: themeColor?.btnColor,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
