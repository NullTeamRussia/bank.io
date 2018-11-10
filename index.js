/** @format */

import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';

import configureStore from './store';
import AppNavigator from './AppNavigator';

const store = configureStore()

export default class App extends React.Component {
    render() {
      return (
        <Provider store={ store } >
          <AppNavigator />
        </Provider>
      );
    }
  }


AppRegistry.registerComponent(appName, () => App);