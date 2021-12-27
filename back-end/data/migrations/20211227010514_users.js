exports.up = function (knex) {
    return knex.schema.createTable("test", (table) => {
        table.increments("test_id").primary();
        table.boolean("does this work").defaultTo(true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("test");
};
