import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import AppointmentList from './appointment/AppointmentList';
import HomeHeader from './HomeHeader';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewStyle}>
        <HomeHeader />
        <AppointmentList />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  viewStyle: {
    height: '100%',
    backgroundColor: 'white',
  },
});
