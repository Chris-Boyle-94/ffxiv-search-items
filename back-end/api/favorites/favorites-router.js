const express = require("express");

const router = express.Router();
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

//eslint-disable-next-line
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        custom: "Something went wrong with the favorites router.",
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;
