const Users = require("./users/users-model");

const validateNewUser = async (req, res, next) => {
    const { username } = req.body;
    try {
        const user = await Users.findUserByUsername(username);
        if (user) {
            res.status(400).json({ message: "this user already exists" });
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
};

const validateExistingUser = async (req, res, next) => {
    const { username } = req.body;
    try {
        const user = await Users.findUserByUsername(username);
        if (!user) {
            res.status(404).json({ message: "user not found" });
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { validateNewUser, validateExistingUser };
