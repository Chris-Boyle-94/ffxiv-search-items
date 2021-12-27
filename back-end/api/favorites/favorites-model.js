const db = require("../../data/db-config");

const findAll = () => {
    return db("favorites");
};

module.exports = {
    findAll,
};
