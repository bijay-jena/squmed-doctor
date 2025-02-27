import moment from 'moment/moment';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../constants/routes';

const AppointmentCard = ({details}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(routes.diagnosis, {details})}>
      {/* Profile Image and Name */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: 'https://railwayprofileimage.s3.ap-south-1.amazonaws.com/avatar.png',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{details?.patient_name}</Text>
      </View>

      {/* Date and Time */}
      <View style={styles.dateTimeContainer}>
        <Text style={styles.date}>
          {moment(details?.appointment_date).format('DD MMM YY, ddd')}
        </Text>
        <Text style={styles.time}>
          {details?.start_time} - {details?.end_time}
        </Text>
      </View>

      {/* Action Buttons */}
      {/* <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rescheduleButton}>
          <Text style={styles.buttonText}>Reschedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.remindButton}>
          <Text style={styles.buttonText}>Remind</Text>
        </TouchableOpacity>
      </View> */}

      {/* Details */}
      <View style={{flexDirection: 'column', gap: 5, paddingHorizontal: 15}}>
        {/* <View style={styles.detailRow}>
          <Text style={styles.label}>Payment</Text>
          <View
            style={{
              flexDirection: "row",
              width: "70%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.dataPaid}>Paid ₹600</Text>
          </View>
        </View> */}

        <View style={styles.detailRow}>
          <Text style={styles.label}>Facility</Text>
          <Text style={styles.linkData}>{details?.facility_name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Reason</Text>
          <Text style={styles.data}>{details?.reason_for_visit}</Text>
        </View>

        {/* <View style={styles.detailRow}>
          <Text style={styles.label}>Booking ID</Text>
          <Text style={styles.dataBold}>CBM129STR</Text>
        </View> */}

        <View style={styles.detailRow}>
          <Text style={styles.label}>Patient ID</Text>
          <Text style={styles.data}>{details?.patient_id}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 15,
    flexDirection: 'column',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#EAF5F4',
    padding: 15,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  cancelButton: {
    backgroundColor: '#f8d7da',
    padding: 10,
    borderRadius: 5,
  },
  rescheduleButton: {
    backgroundColor: '#cce5ff',
    padding: 10,
    borderRadius: 5,
  },
  remindButton: {
    backgroundColor: '#fff3cd',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: '-between',
    marginBottom: 6,
  },
  label: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
    width: '30%',
  },
  data: {
    fontSize: 14,
    color: '#333',
    width: '65%',
  },
  dataPaid: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  linkData: {
    fontSize: 14,
    color: '#0086b3',
    textDecorationLine: 'underline',
    width: '65%',
  },
  dataBold: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewBtn: {
    fontSize: 12,
    backgroundColor: '#2A9D8F',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    fontWeight: '500',
    color: 'white',
  },
});

export default AppointmentCard;
