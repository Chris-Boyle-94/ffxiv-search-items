var dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const pg = require("pg");

if (process.env.DATABASE_URL) {
    pg.defaults.ssl = { rejectUnauthorized: false };
}

module.exports = {
    development: {
        client: "pg",
        connection: process.env.DEV_DATABASE_URL,
        migrations: { directory: "../data/migrations" },
        seeds: { directory: "../data/seeds" },
        pool: {
            min: 2,
            max: 10,
        },
    },
    production: {
        client: "pg",
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: true,
        },
        migrations: { directory: "../data/migrations" },
        seeds: { directory: "../data/seeds" },
    },
};
