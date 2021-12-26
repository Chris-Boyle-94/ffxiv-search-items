export const SEARCH = "SEARCH";

export const search = (searchedItem) => {
    return { type: SEARCH, payload: searchedItem };
};
