import { CLICK, ITEM_UPDATE, LOGIN, SEARCH } from "../actions";

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
        case ITEM_UPDATE:
            return {
                ...state,
                items: action.payload,
            };
        case CLICK:
            return {
                ...state,
                clicked: !state.clicked,
            };
        default:
            return state;
    }
};
