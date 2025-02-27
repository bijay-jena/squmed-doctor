import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {images} from '../../assets/images';
import {LinearGradient} from 'expo-linear-gradient';

const LoginHeader = () => {
  const {theme} = useSelector(state => state.theme);
  const color = theme.primaryColor;

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Consult the</Text>
        <Text style={[styles.headerTitle, {color}]}>BEST DOCTORS</Text>
      </View>

      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={images.auth.loginGroup}
          style={styles.image}
          resizeMode="contain"
        />
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
          style={styles.gradientStyle}
        />
      </View>
    </>
  );
};

export default LoginHeader;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingBottom: verticalScale(30),
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: verticalScale(260),
    resizeMode: 'contain',
  },
  gradientStyle: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
  },
});
