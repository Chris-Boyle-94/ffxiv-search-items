const Favorites = require("./favorites-model");

const validateNewFavorite = async (req, res, next) => {
    const favorite = req.body;
    const { user_id } = req.authData;
    favorite.user_id = user_id;

    try {
        const favoriteExists = await Favorites.findFavoriteByIds(favorite);
        if (favoriteExists.length > 0) {
            res.status(400).json({
                message: "item is already a favorite for this user",
            });
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
};

const validateExistingFavorite = async (req, res, next) => {
    const favorite = req.body;
    const { user_id } = req.authData;
    favorite.user_id = user_id;

    try {
        const favoriteExists = await Favorites.findFavoriteByIds(favorite);
        if (favoriteExists.length == 0) {
            res.status(400).json({
                message: "this is not an existing favorite",
            });
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { validateNewFavorite, validateExistingFavorite };
