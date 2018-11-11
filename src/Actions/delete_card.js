import { DELETE_CARD } from './types';

export const deleteCard = (cardId) => {
  return {
    type: DELETE_CARD,
    payload: cardId
  }
}