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
export const AppWithNavigationState = connect(mapStateToProps)(App);


const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(middleware));
};

export default configureStore;