const initialState = {
    sberbank: false,
    tinkoff: false,
    vtb: false,
    cashless: true,
    getMoney: false,
};

const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case "CHANGE": {
            state[action.payload.key] = !action.payload.value;
            return state;
        }
        default:
            return state;
    }
};

export default filterReducer;