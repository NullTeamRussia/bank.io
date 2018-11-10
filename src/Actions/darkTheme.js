import {SWITCH_THEME} from "./types";

export const darkTheme = (value) => {
    return {
        type: SWITCH_THEME,
        payload: value
    }
};