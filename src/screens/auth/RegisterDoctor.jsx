import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
// import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from 'react-native-vector-icons';
import {useNavigation} from '@react-navigation/native';

import {showToast} from '../../utils/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {handleRegister} from '../../api';
import {setAccountData} from '../../store/accountSlice';
import {SubmitBtn} from '../../components/common';
import {ScreenWrapper} from '../../components/layouts';
import {images} from '../../assets/images';

const RegisterDoctor = () => {
  const [isGetOtpClicked, setIsGetOtpClicked] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const currentTheme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();
  const otpRefs = useRef([]);
  const navigate = useNavigation();

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Move to the next input field if the current one is filled
    if (value) {
      // Move to the next input field if the current one is filled
      if (index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    } else {
      // Move to the previous input field if the current one is cleared
      if (index > 0) {
        otpRefs.current[index - 1].focus();
      }
    }
    if (newOtp?.every(digit => digit !== '')) {
      Keyboard.dismiss();
    }
  };

  const onRegisterPress = async () => {
    if (phone.length !== 10) {
      // showToast('success', response.data.message, 'top');
      return;
    }
    try {
      const response = await handleRegister({
        name,
        phone,
        password,
      });
      if (response.data.statusCode === 200) {
        showToast('success', response.data.message, 'top');
        dispatch(
          setAccountData({
            loggedIn: true,
            userDetail: response.data.data,
            token: response.data.token,
          }),
        );
      } else {
        showToast('error', response.message, 'top');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ScreenWrapper bgColor="white" statusColor="white">
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Consult the</Text>
            <Text
              style={[
                styles.headerTitle,
                {
                  color: currentTheme.primaryColor,
                },
              ]}>
              BEST DOCTORS
            </Text>
          </View>

          {/* Image Section */}
          <View style={styles.imageContainer}>
            <Image
              source={images.auth.loginGroup}
              style={styles.image}
              resizeMode="contain"
            />
            {/* <LinearGradient
              colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: '50%',
              }}
            /> */}
          </View>

          {/* Register Section */}
          <View style={styles.loginContainer}>
            <View
              style={{
                position: 'relative',
                marginBottom: verticalScale(16),
              }}>
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  padding: moderateScale(8),
                  zIndex: 1,
                }}>
                <Pressable
                  onPress={() => {
                    isGetOtpClicked
                      ? setIsGetOtpClicked(false)
                      : navigate.goBack();
                  }}>
                  <Ionicons name="arrow-back" size={24} color="#000" />
                </Pressable>
              </View>
              <Text style={styles.registerTitle}>
                {isGetOtpClicked ? 'Enter OTP ' : 'Register'}
              </Text>
            </View>
            {!isGetOtpClicked ? (
              <>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    keyboardType="default"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.countryCode}>+91</Text>
                  <TextInput
                    maxLength={10}
                    style={styles.input}
                    placeholder="Mobile Number"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>
                <View style={styles.inputContainer}>
                  {/* <Text style={styles.countryCode}>+91</Text> */}
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </>
            ) : (
              <>
                <View>
                  <Text style={styles.otpTitle}>
                    Please enter the 6-digits OTP that has been sent to
                    +91*******
                  </Text>
                </View>
                <View style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={el => (otpRefs.current[index] = el)}
                      style={styles.otpInput}
                      keyboardType="number-pad"
                      maxLength={1}
                      placeholder="-"
                      value={digit}
                      onChangeText={value => handleOtpChange(value, index)}
                    />
                  ))}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: verticalScale(16),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: moderateScale(8),
                    }}>
                    <Ionicons name="time" size={24} color="#00A8E8" />
                    <Text>time 0.00</Text>
                  </View>
                  <TouchableOpacity>
                    <Text
                      style={{
                        textAlign: 'right',
                        color: '#00A8E8',
                        textDecorationLine: 'underline',
                      }}>
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            <SubmitBtn
              title={isGetOtpClicked ? 'Submit OTP' : 'Register'}
              onPress={onRegisterPress}
            />
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text style={styles.termsLink}>Terms & Conditions</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default RegisterDoctor;

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
  loginContainer: {
    marginTop: verticalScale(10),
    paddingHorizontal: moderateScale(16),
  },
  registerTitle: {
    padding: 8,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  countryCode: {
    fontSize: 16,
    color: '#000',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    height: verticalScale(35),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: moderateScale(40),
    height: verticalScale(40),
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#00A8E8',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    marginTop: verticalScale(16),
    textAlign: 'center',
    fontSize: 12,
    color: '#555',
  },
  termsLink: {
    color: '#00A8E8',
    fontWeight: '600',
  },
  otpTitle: {
    fontSize: 16,
    textAlign: 'left',
    color: '#555',
    marginBottom: 16,
  },
});
