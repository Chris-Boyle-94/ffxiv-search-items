import axios from "axios";

export const SEARCH = "SEARCH";
export const ITEM_UPDATE = "ITEM_UPDATE";
export const CLICK = "CLICK";
export const IS_LOGGED_IN = "IS_LOGGED_IN";
export const USER_FAVORITES = "USER_FAVORITES";
export const HAS_ACCOUNT = "HAS_ACCOUNT";

const development = "http://localhost:3333";
const production = "https://moghead.herokuapp.com";
const baseUrl =
    process.env.NODE_ENV === "production" ? production : development;

export const search = (searchedItem) => {
    return { type: SEARCH, payload: searchedItem };
};

export const updateList = (search) => {
    return async (dispatch) => {
        const response = await axios.get(`${baseUrl}/items?string=${search}`);
        dispatch({ type: ITEM_UPDATE, payload: response.data });
    };
};

export const click = (bool) => {
    return { type: CLICK, payload: bool };
};

export const setLoggedIn = (bool) => {
    return { type: IS_LOGGED_IN, payload: bool };
};

export const setUserFavorites = (favorites) => {
    return { type: USER_FAVORITES, payload: favorites };
};

export const setHasAccount = (bool) => {
    return { type: HAS_ACCOUNT, payload: bool };
};
