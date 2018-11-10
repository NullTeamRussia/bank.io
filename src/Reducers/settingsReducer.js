import { storeCards, storeAutoIncrement } from "../Shared/Cards"
import {ADD_CARD, INIT_CARDS, SWITCH_THEME} from "../Actions/types";


const initialState = {
    dark: true
};

const settingsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SWITCH_THEME:
            state.dark = !state.dark;
            return state;
        default:
            return state;
    }
};

export default settingsReducer;