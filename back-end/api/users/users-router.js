const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Users = require("./users-model");
const { validateNewUser } = require("../general-middleware");

router.get("/", (req, res, next) => {
    Users.findAll()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            next(err);
        });
});

router.post("/register", validateNewUser, async (req, res, next) => {
    const user = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash;

    try {
        const response = await Users.insertUser(user);
        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
});

//eslint-disable-next-line
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        custom: "Something went wrong with the users router.",
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;
