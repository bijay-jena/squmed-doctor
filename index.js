/**
 * @format
 */

import {AppRegistry, TurboModuleRegistry} from 'react-native';
import Reactotron from 'reactotron-react-native';
import {name as appName} from './app.json';
import './gesture-handler';
import App from './src/App';

import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';

import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

let scriptHostname;
if (__DEV__) {
  const scriptURL =
    TurboModuleRegistry.getEnforcing('SourceCode').getConstants().scriptURL;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];
  Reactotron.configure({host: scriptHostname}).useReactNative().connect();
}

ZegoUIKitPrebuiltCallService.useSystemCallingUI([ZIM, ZPNs]);

AppRegistry.registerComponent(appName, () => App);
