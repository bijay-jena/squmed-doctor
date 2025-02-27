import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginDoctor, RegisterDoctor} from '../screens/auth';

const UnauthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginDoctor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterDoctor}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default UnauthNavigator;
