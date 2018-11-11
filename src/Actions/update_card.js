import { UPDATE_CARD } from './types';

export const updateCard = (card) => {
  return {
    type: UPDATE_CARD,
    payload: card
  }
}