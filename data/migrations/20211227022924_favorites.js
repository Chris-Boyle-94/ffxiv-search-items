exports.up = function (knex) {
    return knex.schema.createTable("favorites", (table) => {
        table.increments("favorite_id").primary();
        table.integer("item_id").notNullable();
        table
            .integer("user_id")
            .references("user_id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("favorites");
};
