import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register} from '../screens/auth';
import routes from '../constants/routes';

const UnauthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes.register}
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default UnauthNavigator;
