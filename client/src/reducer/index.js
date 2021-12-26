import { SEARCH } from "../actions";

const initialState = {
    searchedItem: "",
    items: [],
    clicked: false,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH:
            return {
                ...state,
                searchedItem: action.payload,
            };
        default:
            return state;
    }
};
