import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

const AppointmentTabs = ({activeTab, setActiveTab}) => {
  const tabs = ['Upcoming', 'Completed'];

  return (
    <View style={styles.tabContainer}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          style={[styles.tabButton, activeTab === tab && styles.activeTab]}
          onPress={() => setActiveTab(tab)}>
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AppointmentTabs;
