const express = require("express");

const router = express.Router();
const {
    validateNewFavorite,
    validateExistingFavorite,
} = require("./favorites-middleware");
const restricted = require("../auth/restricted-middleware");
const Favorites = require("./favorites-model");

router.get("/", restricted, async (req, res, next) => {
    const { user_id } = req.authData;
    try {
        const userFavorites = await Favorites.findUserFavorites(user_id);

        if (userFavorites) {
            res.status(200).json(userFavorites);
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
});

router.post("/specific", restricted, async (req, res, next) => {
    const favorite = req.body;
    const { user_id } = req.authData;
    favorite.user_id = user_id;

    try {
        const specificFavorite = await Favorites.findFavoriteByIds(favorite);
        res.status(200).json(specificFavorite);
    } catch (err) {
        next(err);
    }
});

router.post("/", restricted, validateNewFavorite, async (req, res, next) => {
    const favoriteReq = req.body;
    const { user_id } = req.authData;
    favoriteReq.user_id = user_id;

    try {
        const newFavorite = await Favorites.newFavorite(favoriteReq);
        if (newFavorite) {
            res.status(201).json({ message: "successfully recorded item" });
        }
    } catch (err) {
        next(err);
    }
});

router.delete(
    "/",
    restricted,
    validateExistingFavorite,
    async (req, res, next) => {
        const favoriteReq = req.body;
        const { user_id } = req.authData;
        favoriteReq.user_id = user_id;

        try {
            await Favorites.deleteFavorite(favoriteReq);
            res.status(202).json({ message: "favorite successfully deleted" });
        } catch (err) {
            next(err);
        }
    }
);

//eslint-disable-next-line
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        custom: "Something went wrong with the favorites router.",
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;
