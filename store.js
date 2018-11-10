import { createStore, combineReducers } from 'redux';
import cardsReducer from './src/Reducers/cardsReducer';

const rootReducer = combineReducers({
  cards: cardsReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;