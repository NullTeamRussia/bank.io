import { ADD_CARD, INIT_CARDS, UPDATE_CARD, DELETE_CARD } from "../Actions/types";
import { storeCards, storeAutoIncrement } from "../Shared/Cards"

const initialState = {
  cards: [],
  autoIncrement: 0
};

const cardsReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_CARD:
      action.payload.ID = state.autoIncrement;
      state.autoIncrement += 1;
      state.cards.unshift(action.payload);
      storeCards(state.cards);
      storeAutoIncrement(state.autoIncrement);
      return state;
    case UPDATE_CARD: 
      value = state.cards.find((val, ind) => {
        val.ID === action.payload.ID
      })
      state.cards.splice(state.cards[state.cards.indexOf(value)], 1)
      state.cards.unshift(action.payload)
      storeCards(state.cards);
      return state
    case DELETE_CARD:
      value = state.cards.find((val, ind) => {
        val.ID === action.payload
      })
      state.cards.splice(state.cards[state.cards.indexOf(value)], 1)
      storeCards(state.cards);
      return state
    case INIT_CARDS:
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default cardsReducer;