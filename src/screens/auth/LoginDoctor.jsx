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

import {useDispatch, useSelector} from 'react-redux';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
// import { LinearGradient } from "expo-linear-gradient";

import {showToast} from '../../utils/Toast';
import {handleLogin} from '../../api';
import {SubmitBtn} from '../../components/common';
import {ScreenWrapper} from '../../components/layouts';
import {images} from '../../assets/images';
import {setAccount, setSelectedFacility} from '../../store/accountSlice';
import routes from '../../constants/routes';

const LoginDoctor = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();

  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const currentTheme = useSelector(state => state.theme.theme);
  const [isGetOtpClicked, setIsGetOtpClicked] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value) {
      if (index < otpRefs.current.length - 1)
        otpRefs.current[index + 1].focus();
    } else {
      if (index > 0) otpRefs.current[index - 1].focus();
    }
    if (newOtp?.every(digit => digit !== '')) Keyboard.dismiss();
  };

  // const handleGetOptClicked = () => {
  //   if (mobileNo.length !== 10) {
  //     alert("Please enter a valid mobile number");
  //     return;
  //   }
  //   setIsGetOtpClicked(true);
  //   const otpString = otp.join("");

  //   if (otpString === "123456") {
  //     showToast("success", "Login Successful", "top");
  //     navigate(routes.home);
  //   }
  // };

  const onCreateAccountPress = async () => {
    navigate(routes.register);
  };

  const handleLoginClicked = async () => {
    if (mobileNo.length !== 10) {
      showToast('info', 'Please enter a valid mobile number', 'bottom');
      return;
    }
    try {
      const response = await handleLogin({
        phone: mobileNo,
        password: password,
      });
      if (response.data.statusCode === 200) {
        showToast('info', response.data.message, 'top');
        dispatch(
          setAccount({
            loggedIn: true,
            userDetail: response.data.data,
            token: response.data.token,
          }),
        );
        dispatch(
          setSelectedFacility(
            response?.data?.data?.doctor_profiles?.[0]?.facilities?.[0],
          ),
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
              colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "50%",
              }}
            /> */}
          </View>

          {/* Login Section */}
          <View style={styles.loginContainer}>
            <View
              style={{
                position: 'relative',
                marginBottom: verticalScale(16),
              }}>
              {isGetOtpClicked && (
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    padding: moderateScale(8),
                    zIndex: 1,
                  }}>
                  <Pressable
                    onPress={() => {
                      setIsGetOtpClicked(false);
                    }}>
                    <Icon name="arrow-back" size={24} color="#000" />
                  </Pressable>
                </View>
              )}
              <Text style={styles.loginTitle}>
                {isGetOtpClicked ? 'Enter OTP ' : 'Login'}
              </Text>
            </View>
            {!isGetOtpClicked ? (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.countryCode}>+91</Text>
                  <TextInput
                    maxLength={10}
                    style={styles.input}
                    placeholder="Enter Mobile No."
                    keyboardType="phone-pad"
                    value={mobileNo}
                    onChangeText={setMobileNo}
                  />
                </View>
                <View style={styles.inputContainer}>
                  {/* <Text style={styles.countryCode}>+91</Text> */}
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
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
                    <Icon name="time" size={24} color="#00A8E8" />
                    <Text>0.00</Text>
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
              title={isGetOtpClicked ? 'Submit OTP' : 'Login'}
              onPress={handleLoginClicked}
            />
            <TouchableOpacity
              onPress={onCreateAccountPress}
              style={styles.createAccountContainer}>
              <Text style={styles.createAccountLink}>Create Account</Text>
            </TouchableOpacity>

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

export default LoginDoctor;

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
  loginTitle: {
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
  createAccountContainer: {
    paddingTop: verticalScale(8),
    alignItems: 'center',
  },
  createAccountLink: {
    color: '#B4852A',
    fontWeight: '700',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  termsLink: {
    color: '#00A8E8',
    fontWeight: '600',
  },
  createLink: {
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
