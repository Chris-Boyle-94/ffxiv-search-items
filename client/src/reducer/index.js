import {
    CLICK,
    IS_LOGGED_IN,
    USER_FAVORITES,
    ITEM_UPDATE,
    SEARCH,
    HAS_ACCOUNT,
} from "../actions";

const initialState = {
    searchedItem: "",
    items: [],
    clicked: false,
    isLoggedIn: false,
    userFavorites: [],
    hasAccount: false,
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
                clicked: action.payload,
            };
        case IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        case USER_FAVORITES:
            return {
                ...state,
                userFavorites: action.payload,
            };
        case HAS_ACCOUNT:
            return {
                ...state,
                hasAccount: action.payload,
            };
        default:
            return state;
    }
};
