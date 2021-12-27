const express = require("express");

const router = express.Router();
const Users = require("./users-model");

router.get("/", (req, res, next) => {
    Users.findAll()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            next(err);
        });
});

//eslint-disable-next-line
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        custom: "Something went wrong with the items router.",
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;
