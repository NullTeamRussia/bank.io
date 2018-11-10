/** @format */

import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import cardsReducer from './src/Reducers/cardsReducer';
import settingsReducer from "./src/Reducers/settingsReducer";
import { connect } from 'react-redux'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import AppNavigator from './AppNavigator'

const navReducer = createNavigationReducer(AppNavigator);

const rootReducer = combineReducers({
    cards: cardsReducer,
    settings: settingsReducer,
    nav: navReducer
});

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const App = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);


const store = createStore(rootReducer, applyMiddleware(middleware));

export default class MainApp extends React.Component {
    render() {
      return (
        <Provider store={ store } >
          <AppWithNavigationState />
        </Provider>
      );
    }
  }


AppRegistry.registerComponent(appName, () => MainApp);