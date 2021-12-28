const Favorites = require("./favorites-model");

const validateNewFavorite = async (req, res, next) => {
    const favorite = req.body;

    try {
        const favoriteExists = await Favorites.findFavoriteByIds(favorite);
        console.log(favoriteExists);
        if (favoriteExists.length > 0) {
            res.status(400).json("item is already a favorite for this user");
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { validateNewFavorite };
