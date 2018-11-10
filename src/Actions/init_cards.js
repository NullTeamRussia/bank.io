import { INIT_CARDS } from './types';

export const initCards = (cards) => {
  return {
    type: INIT_CARDS,
    payload: cards
  }
}