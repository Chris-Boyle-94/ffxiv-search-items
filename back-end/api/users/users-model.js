const db = require("../../data/db-config");

const findAll = () => {
    return db("users");
};

module.exports = {
    findAll,
};
