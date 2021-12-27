const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const itemsRouter = require("./items/items-router");
const usersRouter = require("./users/users-router");
const favoritesRouter = require("./favorites/favorites-router");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/items", itemsRouter);
server.use("/users", usersRouter);
server.use("/favorites", favoritesRouter);

server.get("/", (req, res) => {
    res.json({ message: "api is up and running" });
});

module.exports = server;
