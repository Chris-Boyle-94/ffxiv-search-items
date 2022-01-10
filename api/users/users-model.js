const db = require("../../data/db-config");

const findAll = () => {
    return db("users");
};

const findUserByUsername = (username) => {
    return db("users").where({ username }).first();
};

const insertUser = (user) => {
    return db("users")
        .insert({
            username: user.username,
            password: user.password,
        })
        .returning("*");
};

module.exports = {
    findAll,
    findUserByUsername,
    insertUser,
};
