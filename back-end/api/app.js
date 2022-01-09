const express = require("express");
const path = require("path");
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

server.use(express.static(path.resolve(__dirname, "./client/build")));

server.get("/", (req, res) => {
    res.json({ message: "api is up and running" });
});

module.exports = server;
