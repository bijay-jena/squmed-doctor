import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {StatusBar} from 'react-native-status-bar';

const ScreenWrapper = ({
  children,
  bgColor = '#EEF0F3',
  statusColor = '#EEF0F3',
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: bgColor,
      }}>
      <StatusBar style="dark" backgroundColor={statusColor} />
      {children}
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
