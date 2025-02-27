import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import Profile from '../screens/auth/Profile';
import {Conversational} from '../screens/diagnosis';
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home Screen">
      <Stack.Screen
        name="Home Screen"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Diagnosis"
        component={Conversational}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Doctor Visit"
        component={DoctorVisit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Enter Area Location"
        component={EnterAreaLocation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Address Details"
        component={AddAddressDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Location"
        component={AddLocation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Select Address"
        component={SelectAddress}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Select Profiles"
        component={SelectProfiles}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Select Slot"
        component={SelectSlot}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Select Tests"
        component={SelectTests}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Collection Order Details"
        component={CollectionOrderDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Create Profile"
        component={CreateProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Payment Successful"
        component={PaymentSuccessful}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Payment Failed"
        component={PaymentFailed}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profiles"
        component={Profiles}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile Details"
        component={ProfileDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Appointment Screen"
        component={AppointmentScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Select Doctor"
        component={SelectDoctor}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Appointment Detail"
        component={AppointmentDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
