exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("user_id").primary();
        table.string("username").notNullable().unique();
        table.string("password").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users");
};
