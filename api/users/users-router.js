const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { buildToken } = require("../auth/token-builder");

const Users = require("./users-model");
const {
    validateNewUser,
    validateExistingUser,
} = require("../general-middleware");

router.post("/register", validateNewUser, (req, res, next) => {
    const user = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash;

    try {
        Users.insertUser(user);
        res.status(201).json({ message: "registration successful" });
    } catch (err) {
        next(err);
    }
});

router.post("/login", validateExistingUser, async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await Users.findUserByUsername(username);
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = buildToken(user);
            res.status(200).json({
                user_id: user.user_id,
                message: `Signed in as user: ${username}`,
                token,
            });
        }
    } catch (err) {
        next({
            status: 401,
            message: err,
        });
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
