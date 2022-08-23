/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning:'];
AppRegistry.registerComponent(appName, () => App);

