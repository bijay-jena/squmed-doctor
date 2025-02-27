import Toast from 'react-native-toast-message';

const showToast = (status, message, position, props, visibilityTime = 4000) => {
  Toast.show({
    type: status,
    text1: message,
    position,
    props,
    visibilityTime, // Add visibilityTime here
  });
};

export {showToast};
