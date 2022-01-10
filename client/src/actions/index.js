import axios from "axios";

export const SEARCH = "SEARCH";
export const ITEM_UPDATE = "ITEM_UPDATE";
export const CLICK = "CLICK";
export const IS_LOGGED_IN = "IS_LOGGED_IN";

const baseUrl = process.env.baseUrl || "http://localhost:3333";

export const search = (searchedItem) => {
    return { type: SEARCH, payload: searchedItem };
};

export const updateList = (search) => {
    return async (dispatch) => {
        const response = await axios.get(`${baseUrl}/items?string=${search}`);
        dispatch({ type: ITEM_UPDATE, payload: response.data });
    };
};

export const click = () => {
    return { type: CLICK };
};

export const setLoggedIn = (bool) => {
    return { type: IS_LOGGED_IN, payload: bool };
};
