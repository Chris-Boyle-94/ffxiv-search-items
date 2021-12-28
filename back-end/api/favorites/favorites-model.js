const db = require("../../data/db-config");

const findAll = () => {
    return db("favorites");
};

const findFavoriteByIds = (favorite) => {
    return db("favorites").where({
        user_id: favorite.user_id,
        item_id: favorite.item_id,
    });
};

const newFavorite = (favorite) => {
    const { user_id, item_id } = favorite;

    return db("favorites")
        .insert({
            item_id,
            user_id,
        })
        .returning("*");
};

module.exports = {
    findAll,
    findFavoriteByIds,
    newFavorite,
};
