import { ADD_CARD } from './types';

export const addCard = (card) => {
  return {
    type: ADD_CARD,
    payload: card
  }
}