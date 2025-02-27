import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
// import AntDesign from "@expo/vector-icons/AntDesign";
// import Entypo from "@expo/vector-icons/Entypo";
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  setSelectedFacility,
  setAccountData,
  resetAccount,
} from '../../store/accountSlice';
import {handleSyncFacilities} from '../../api';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {userDetail, selectedFacility} = useSelector(state => state.accounts);
  const {profile_image, name, email, phone, doctor_profiles} = userDetail ?? {};

  const [showTenantModal, setShowTenantModal] = useState(false);
  const [showFacilityModal, setShowFacilityModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogout = () => {
    dispatch(resetAccount());
  };

  const handleTenantSelect = tenant => {
    setSelectedTenant(tenant);
    setShowTenantModal(false);
    setShowFacilityModal(true);
  };

  const handleFacilitySelect = facility => {
    dispatch(setSelectedFacility(facility));
    setShowFacilityModal(false);
  };

  const handleSyncPress = () => {
    setPassword('');
    setPasswordError('');
    setShowPasswordModal(true);
  };

  const handleSyncProfile = async () => {
    try {
      setIsSyncing(true);

      // If password is correct, sync profile
      const response = await handleSyncFacilities({
        id: userDetail?._id,
        phone,
        password,
      });
      setShowPasswordModal(false);
      // Optional: Add a success toast/alert here
    } catch (error) {
      console.error('Failed to sync profile:', error);
      setPasswordError('Failed to verify password');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          margin: 15,
          display: 'flex',
          flexDirection: 'column',
          gap: 25,
        }}>
        <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 7,
            borderWidth: 1,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
          }}>
          <ImageBackground
            source={{
              uri:
                profile_image ??
                'https://railwayprofileimage.s3.ap-south-1.amazonaws.com/avatar.png',
            }}
            style={styles.avatar}
          />
          <View style={{display: 'flex', flexDirection: 'column', gap: 5}}>
            <Text style={styles.name}>{name}</Text>
            <Text>{email}</Text>
            <Text>{phone}</Text>
            <Text>{selectedFacility?.facility_name}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setShowTenantModal(true)}
          style={{
            display: 'flex',
            borderBottomWidth: 1,
            paddingVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text>swap</Text>
            {/* <AntDesign name="swap" size={24} color="black" /> */}
            <Text>Change Facility</Text>
          </View>
          <Text>chev right</Text>
          {/* <Entypo name="chevron-small-right" size={24} color="black" /> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSyncPress}
          disabled={isSyncing}
          style={{
            display: 'flex',
            borderBottomWidth: 1,
            paddingVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            {/* <AntDesign
              name="sync"
              size={24}
              color="black"
              style={isSyncing ? styles.rotating : null}
            /> */}
            <Text>sync</Text>
            <Text>{isSyncing ? 'Syncing...' : 'Sync Profile'}</Text>
          </View>
          <Text>chev smal right</Text>
          {/* <Entypo name="chevron-small-right" size={24} color="black" /> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            display: 'flex',
            borderBottomWidth: 1,
            paddingVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text>logout</Text>
            {/* <AntDesign name="logout" size={24} color="black" /> */}
            <Text>Logout</Text>
          </View>
          <Text>chev small right</Text>
          {/* <Entypo name="chevron-small-right" size={24} color="black" /> */}
        </TouchableOpacity>

        {/* Tenant Selection Modal */}
        <Modal
          visible={showTenantModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowTenantModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Tenant</Text>
              <View style={styles.listContainer}>
                {doctor_profiles.map((tenant, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.listItem}
                    onPress={() => handleTenantSelect(tenant)}>
                    <Text style={styles.itemText}>{tenant.tenant_name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowTenantModal(false)}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Facility Selection Modal */}
        <Modal
          visible={showFacilityModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowFacilityModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Facility</Text>
              <View style={styles.listContainer}>
                {selectedTenant?.facilities?.map((facility, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.listItem}
                    onPress={() => handleFacilitySelect(facility)}>
                    <Text style={styles.itemText}>
                      {facility.facility_name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowFacilityModal(false)}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Password Confirmation Modal */}
        <Modal
          visible={showPasswordModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowPasswordModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirm Password</Text>
              <Text style={styles.modalSubtitle}>
                Please enter your password to sync profile
              </Text>

              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />

              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowPasswordModal(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={handleSyncProfile}
                  disabled={!password.trim() || isSyncing}>
                  <Text style={styles.buttonText}>
                    {isSyncing ? 'Syncing...' : 'Confirm'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  avatar: {
    height: 69,
    width: 69,
    overflow: 'hidden',
    borderRadius: 25,
    objectFit: 'cover',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  listContainer: {
    maxHeight: '80%',
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
  },
  rotating: {
    transform: [{rotate: '360deg'}],
    animation: 'rotate 1s linear infinite',
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginVertical: 15,
    width: '100%',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 15,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
});
