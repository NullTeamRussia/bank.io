import { SWITCH_THEME} from "../Actions/types";


const initialState = {
    dark: true
};

const settingsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SWITCH_THEME:
            state.dark = action.payload;
            return state;
        default:
            return state;
    }
};

export default settingsReducer;