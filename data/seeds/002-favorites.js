const data = [
    { item_id: 5, user_id: 1 },
    { item_id: 70, user_id: 1 },
];

exports.seed = function (knex) {
    return knex("favorites")
        .del()
        .then(() => {
            return knex("favorites").insert(data);
        });
};
