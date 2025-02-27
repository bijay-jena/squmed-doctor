import React from 'react';
import {ImageBackground, StatusBar, Text, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import routes from '../../constants/routes';

const HomeHeader = () => {
  const navigation = useNavigation();

  const {userDetail} = useSelector(state => state.accounts);
  const {profile_image, name} = userDetail ?? {};

  return (
    <View style={styles.headerView}>
      <StatusBar backgroundColor="#000" translucent={false} style="light" />
      <View style={styles.headerVertical}>
        <View style={styles.headerHorizontal}>
          <View>
            <Text style={{color: '#008585', ...styles.fw500, ...styles.fs18}}>
              Hello,
            </Text>
            <Text style={{color: 'white', ...styles.fw500, ...styles.fs18}}>
              {name}
            </Text>
          </View>

          <TouchableOpacity
            style={{flexDirection: 'column', alignItems: 'center'}}
            onPress={() => navigation.navigate(routes.profile)}>
            <ImageBackground
              source={{
                uri:
                  profile_image ??
                  'https://railwayprofileimage.s3.ap-south-1.amazonaws.com/avatar.png',
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  fw500: {
    fontWeight: '500',
  },
  fs18: {
    fontSize: 18,
  },
  headerView: {
    width: '100%',
    height: 60,
    backgroundColor: '#000',
  },
  headerVertical: {
    width: '100%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    padding: 16,
  },
  headerHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexGrow: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  headerCenter: {
    flexGrow: 1,
    alignItems: 'center',
  },
  headerRight: {
    flexGrow: 1,
    alignItems: 'flex-end',
  },
  helloText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '200',
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontweight: '500',
    textAlign: 'center',
  },
  avatar: {
    height: 39,
    width: 39,
    overflow: 'hidden',
    borderRadius: 25,
  },
  headerTwo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
