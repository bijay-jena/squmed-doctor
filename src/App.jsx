import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {Provider, useSelector} from 'react-redux';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';

import {AuthNavigator, UnauthNavigator} from './navigation';
import {persistor, store} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import {ZegoCallInvitationDialog} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 0,
        height: moderateScale(45),
        borderRadius: moderateScale(10),
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: 'green',
        borderRadius: moderateScale(10),
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        color: 'white',
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{
        borderLeftWidth: 0,
        height: moderateScale(45),
        borderRadius: moderateScale(10),
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: 'red',
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        color: 'white',
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: '400',
        color: 'white',
      }}
    />
  ),
};

const StackSelector = () => {
  const {loggedIn} = useSelector(state => state.accounts);
  return loggedIn ? <AuthNavigator /> : <UnauthNavigator />;
};

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <ZegoCallInvitationDialog />
            <StackSelector />
          </NavigationContainer>
          <Toast config={toastConfig} />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
