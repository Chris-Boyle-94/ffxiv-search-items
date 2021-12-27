const data = [{ username: "seed001", password: "testSeed" }];

exports.seed = function (knex) {
    return knex("users")
        .del()
        .then(() => {
            return knex("users").insert(data);
        });
};
