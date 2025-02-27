import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import {useDispatch} from 'react-redux';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

import {showToast} from '../../utils/Toast';
import {handleLogin} from '../../api';
import {SubmitBtn} from '../../components/common';
import {ScreenWrapper} from '../../components/layouts';
import {setAccount, setSelectedFacility} from '../../store/accountSlice';
import routes from '../../constants/routes';
import LoginHeader from './LoginHeader';
import globalStyles from '../../styles/globalStyles';

// Zego Additions
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import zegoConfig from '../../configs/zegoConfig';

const Login = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();

  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');

  const onCreateAccountPress = async () => {
    navigate(routes.register);
  };

  const onUserLogin = async () => {
    if (mobileNo.length !== 10) {
      showToast('info', 'Please enter a valid mobile number', 'bottom');
      return;
    }
    try {
      const response = await handleLogin({
        phone: mobileNo,
        password: password,
      });
      const {statusCode, data: userDetail, token} = response?.data ?? {};
      if (statusCode === 200) {
        showToast('info', `Welcome ${userDetail?.name}!`, 'top');
        dispatch(
          setAccount({
            loggedIn: true,
            userDetail,
            token,
          }),
        );
        dispatch(
          setSelectedFacility(
            userDetail?.doctor_profiles?.[0]?.facilities?.[0],
          ),
        );
        ZegoUIKitPrebuiltCallService.init(
          zegoConfig.appId,
          zegoConfig.appSign,
          mobileNo,
          userDetail?.name,
          [ZIM, ZPNs],
          {
            ringtoneConfig: {
              incomingCallFileName: 'zego_incoming.mp3',
              outgoingCallFileName: 'zego_outgoing.mp3',
            },
            androidNotificationConfig: {
              channelID: 'ZegoUIKit',
              channelName: 'ZegoUIKit',
            },
          },
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
      <KeyboardAvoidingView behavior="height" style={globalStyles.flex1}>
        <ScrollView
          contentContainerStyle={globalStyles.fg1}
          showsVerticalScrollIndicator={false}>
          <LoginHeader />

          {/* Login Section */}
          <View style={styles.loginContainer}>
            <View style={styles.loginTitleContainer}>
              <Text style={styles.loginTitle}>Login</Text>
            </View>
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

            <SubmitBtn title={'Login'} onPress={onUserLogin} />
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

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    marginTop: verticalScale(10),
    paddingHorizontal: moderateScale(16),
  },
  loginTitleContainer: {
    position: 'relative',
    marginBottom: verticalScale(16),
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
