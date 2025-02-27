/**
 * @format
 */

import {AppRegistry, TurboModuleRegistry} from 'react-native';
import Reactotron from 'reactotron-react-native';
import {name as appName} from './app.json';
import './gesture-handler';
import App from './src/App';

let scriptHostname;
if (__DEV__) {
  const scriptURL = TurboModuleRegistry.getEnforcing('SourceCode').getConstants().scriptURL;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];
  Reactotron.configure({ host: scriptHostname })
    .useReactNative()
    .connect();
}

AppRegistry.registerComponent(appName, () => App);
