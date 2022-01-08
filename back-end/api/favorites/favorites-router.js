const express = require("express");

const router = express.Router();
const {
    validateNewFavorite,
    validateExistingFavorite,
} = require("./favorites-middleware");
const Favorites = require("./favorites-model");

router.get("/", (req, res, next) => {
    Favorites.findAll()
        .then((favorites) => {
            res.status(200).json(favorites);
        })
        .catch((err) => {
            next(err);
        });
});

router.get("/:id", async (req, res, next) => {
    const { id } = req.params;

    try {
        const userFavorites = await Favorites.findUserFavorites(id);
        if (userFavorites) {
            res.status(200).json(userFavorites);
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
});

router.post("/", validateNewFavorite, async (req, res, next) => {
    const favoriteReq = req.body;

    try {
        if (favoriteReq.body.user_id != null) {
            const newFavorite = await Favorites.newFavorite(favoriteReq);
            if (newFavorite) {
                res.status(201).json({ message: "successfully recorded item" });
            }
        } else {
            res.status(400).json({ message: "not logged in" });
        }
    } catch (err) {
        next(err);
    }
});

router.delete("/", validateExistingFavorite, async (req, res, next) => {
    const favoriteReq = req.body;

    try {
        await Favorites.deleteFavorite(favoriteReq);
        res.status(202).json({ message: "favorite successfully deleted" });
    } catch (err) {
        next(err);
    }
});

//eslint-disable-next-line
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        custom: "Something went wrong with the favorites router.",
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;
