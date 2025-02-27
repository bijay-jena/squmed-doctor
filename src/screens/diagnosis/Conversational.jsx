import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {Audio} from 'expo-av';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import axiosInstance from '../../api/axiosConfig';
import {camelize, camelToTitleCase} from '../../utils/helpers';
import Icon from 'react-native-vector-icons/Ionicons';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenWrapper} from '../../components/layouts';
import EMRTabs from './EMRTabs';

import {ZegoSendCallInvitationButton} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const Conversational = () => {
  const navigate = useNavigation();
  const route = useRoute();
  const {details} = route.params;

  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [response, setResponse] = useState('');
  const [editableResponse, setEditableResponse] = useState(null);
  const [isAddFieldModalVisible, setIsAddFieldModalVisible] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  const [currentSection, setCurrentSection] = useState(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('Prescription');

  const startRecording = async () => {
    try {
      // Request permissions
      const {status} = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access microphone is required!');
        return;
      }

      // Set audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Start recording
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const base64Audio = await convertToBase64(uri);
      setIsRecording(false);

      // Call API with base64 audio data
      const res = await sendAudioToAPI(base64Audio);
      setResponse(res);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const convertToBase64 = async uri => {
    const res = await fetch(uri);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result.split(',')[1];
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const sendAudioToAPI = async b64_str => {
    try {
      const res = await axios.post('http://65.0.39.162:8000/conversation_ner', {
        b64_str,
      });
      return res?.data ?? {}; // Adjust according to your API response structure
    } catch (err) {
      console.error('API call failed', err);
      return 'Error processing audio';
    }
  };

  const renderResponseSection = (title, dataArray) => {
    if (title === 'status') {
      return null;
    }

    return (
      <View key={title} style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{camelToTitleCase(title)}</Text>
        {typeof dataArray === 'string' ? (
          <TextInput
            style={styles.input}
            value={dataArray}
            onChangeText={text => updateResponse(title, text)}
            multiline
          />
        ) : (
          <>
            {dataArray.map((item, index) => (
              <View key={index} style={styles.sectionItem}>
                <View style={styles.itemHeader}>
                  <TouchableOpacity
                    onPress={() => removeItem(title, index)}
                    style={styles.removeItemButton}>
                    <Text style={styles.removeItemText}>Delete</Text>
                  </TouchableOpacity>
                </View>
                {Object.entries(item).map(([key, value]) => (
                  <View key={key} style={styles.inputRow}>
                    <Text style={styles.inputLabel}>
                      {camelToTitleCase(key)}:
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={String(value)}
                      onChangeText={text =>
                        updateResponseItem(title, index, key, text)
                      }
                    />
                    <TouchableOpacity
                      onPress={() => removeKey(title, index, key)}
                      style={styles.removeKeyButton}>
                      <Text style={styles.removeKeyText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                <TouchableOpacity
                  style={styles.addKeyButton}
                  onPress={() => addNewKey(title, index)}>
                  <Text style={styles.addKeyText}>+ Add Field</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addNewItem(title, dataArray?.[0] ?? {})}>
              <Text style={styles.addButtonText}>+ Add Item</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  const updateResponse = (section, value) => {
    setEditableResponse(prev => ({
      ...prev,
      [section]: value,
    }));
  };

  const updateResponseItem = (section, index, key, value) => {
    setEditableResponse(prev => {
      const newData = {...prev};
      newData[section][index] = {
        ...newData[section][index],
        [key]: value,
      };
      return newData;
    });
  };

  const addNewItem = (section, template) => {
    setEditableResponse(prev => {
      const newData = {...prev};
      const newItem = Object.fromEntries(
        Object.keys(template).map(key => [key, '']),
      );
      newData[section] = [...newData[section], newItem];
      return newData;
    });
  };
  const handleNewKey = (newKey, section, itemIndex) => {
    if (newKey) {
      setEditableResponse(prev => {
        const newData = {...prev};
        newData[section][itemIndex] = {
          ...newData[section][itemIndex],
          [camelize(newKey)]: '',
        };
        return newData;
      });
    }
  };

  const addNewKey = (section, itemIndex) => {
    // For iOS
    if (Platform.OS === 'ios') {
      Alert.prompt(
        'Add New Field',
        'Enter field name:',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: newKey => handleNewKey(newKey, section, itemIndex),
          },
        ],
        'plain-text',
      );
    } else {
      // For Android, show custom modal
      setCurrentSection(section);
      setCurrentItemIndex(itemIndex);
      setNewFieldName('');
      setIsAddFieldModalVisible(true);
    }
  };

  const removeKey = (section, itemIndex, key) => {
    setEditableResponse(prev => {
      const newData = {...prev};
      const newItem = {...newData[section][itemIndex]};
      delete newItem[key];
      newData[section][itemIndex] = newItem;
      return newData;
    });
  };

  const removeItem = (section, itemIndex) => {
    setEditableResponse(prev => {
      const newData = {...prev};
      newData[section] = newData[section].filter(
        (_, index) => index !== itemIndex,
      );
      return newData;
    });
  };

  const saveEMR = async () => {
    try {
      const res = await axiosInstance.post('emr/save', {
        patient_visit_id: details?.patient_visit_id,
        patient_id: details?.patient_id,
        properties: editableResponse,
      });
      console.log('EMR saved successfully', res);
    } catch (error) {
      console.error('Error in saving emr', error);
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    try {
      if (!editableResponse) {
        const parsedResponse =
          typeof response === 'string' ? JSON.parse(response) : response;
        setEditableResponse(parsedResponse);
        return null;
      }

      if (activeTab === 'Prescription')
        return (
          <View style={styles.responseContainer}>
            {Object.entries(editableResponse).map(([key, value]) => {
              if (key === 'status') return null;
              if (typeof value === 'string') {
                return (
                  <Text>
                    Summary:{' '}
                    {value?.length > 0
                      ? value
                      : 'Please give some input to generate summary '}
                  </Text>
                );
              }
            })}
          </View>
        );

      return (
        <View style={styles.responseContainer}>
          <Text style={styles.responseTitle}>Analysis Results:</Text>
          {Object.entries(editableResponse).map(([key, value]) =>
            renderResponseSection(key, value),
          )}
        </View>
      );
    } catch (error) {
      return (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>Error in response</Text>
        </View>
      );
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: 'white',
      }}>
      <ScreenWrapper>
        <SafeAreaView
          style={{
            backgroundColor: 'white',
          }}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              padding: moderateScale(8),
              zIndex: 1,
            }}>
            <TouchableOpacity onPress={navigate.goBack}>
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <ZegoSendCallInvitationButton
            invitees={[{userID: '7275158615', userName: 'John Doe'}]}
            isVideoCall={true}
            resourceID={'zego_call'} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
          />
          <View style={styles.container}>
            {/* Patient Details Section */}
            <View style={styles.patientCard}>
              <Text style={styles.patientName}>{details?.patient_name}</Text>
              <Text style={styles.patientDetail}>
                Patient ID: {details?.patient_id}
              </Text>
              <Text style={styles.patientDetail}>
                Reason: {details?.reason_for_visit}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.button, isRecording && styles.recordingButton]}
              onPress={isRecording ? stopRecording : startRecording}>
              <Text style={styles.buttonText}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Text>
            </TouchableOpacity>
          </View>
          {response && (
            <>
              <EMRTabs activeTab={activeTab} setActiveTab={setActiveTab} />

              <View style={styles.container}>
                {renderResponse()}
                <TouchableOpacity style={styles.button} onPress={saveEMR}>
                  <Text style={styles.buttonText}>Save EMR</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Custom Alert Dialog for Android */}
          {Platform.OS === 'android' && (
            <Modal
              visible={isAddFieldModalVisible}
              transparent
              animationType="fade"
              onRequestClose={() => setIsAddFieldModalVisible(false)}>
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Add New Field</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={newFieldName}
                    onChangeText={setNewFieldName}
                    placeholder="Enter field name"
                    autoFocus
                  />
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => setIsAddFieldModalVisible(false)}>
                      <Text style={styles.modalButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.modalButtonPrimary]}
                      onPress={() => {
                        if (newFieldName.trim()) {
                          handleNewKey(
                            newFieldName.trim(),
                            currentSection,
                            currentItemIndex,
                          );
                          setIsAddFieldModalVisible(false);
                        }
                      }}>
                      <Text style={styles.modalButtonTextPrimary}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </SafeAreaView>
      </ScreenWrapper>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: verticalScale(10),
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 25,
    width: 200,
    alignItems: 'center',
  },
  recordingButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  responseContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    width: '100%',
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  responseText: {
    fontSize: 16,
  },
  patientCard: {
    backgroundColor: '#EAF5F4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  patientName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  patientDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  sectionContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2A9D8F',
  },
  sectionItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginVertical: 4,
    backgroundColor: '#fff',
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
    minWidth: 100,
  },
  addButton: {
    backgroundColor: '#2A9D8F',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addKeyButton: {
    backgroundColor: '#E9ECF1',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
    alignItems: 'center',
  },
  addKeyText: {
    color: '#2A9D8F',
    fontSize: 12,
    fontWeight: 'bold',
  },
  removeKeyButton: {
    padding: 4,
    marginLeft: 8,
  },
  removeKeyText: {
    color: '#FF3B30',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    padding: 10,
    marginLeft: 10,
  },
  modalButtonPrimary: {
    backgroundColor: '#2A9D8F',
    borderRadius: 4,
  },
  modalButtonText: {
    color: '#2A9D8F',
    fontSize: 16,
  },
  modalButtonTextPrimary: {
    color: 'white',
    fontSize: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  removeItemButton: {
    backgroundColor: '#FF3B30',
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  removeItemText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Conversational;
