import { createStore, combineReducers } from 'redux';
import cardsReducer from './src/Reducers/cardsReducer';
import settingsReducer from "./src/Reducers/settingsReducer";

const rootReducer = combineReducers({
    cards: cardsReducer,
    settings: settingsReducer
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;