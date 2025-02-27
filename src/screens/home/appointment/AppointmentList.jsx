import React, {useCallback, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import {getAppointments} from '../../../api';
import AppointmentCard from './AppointmentCard';
import AppointmentTabs from './AppointmentTabs';
import {styles} from './styles';
import {getDateRange} from '../../../utils/dateUtils';

const AppointmentList = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [appointmentList, setAppointmentList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const {selectedFacility} = useSelector(state => state.accounts);

  const getBookedSlots = async () => {
    try {
      setRefreshing(true);
      const {start_date, end_date} = getDateRange(activeTab);
      const {data} = await getAppointments({
        doctorId: selectedFacility?.emp_id,
        start_date,
        end_date,
      });
      setAppointmentList(data?.data ?? []);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getBookedSlots();
    }, [activeTab]),
  );

  return (
    <View style={styles.container}>
      <AppointmentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <View style={styles.listContainer}>
        <FlatList
          data={appointmentList}
          keyExtractor={item => item?._id}
          renderItem={({item}) => (
            <AppointmentCard key={item?._id} details={item} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={getBookedSlots}
            />
          }
        />
      </View>
    </View>
  );
};

export default AppointmentList;
