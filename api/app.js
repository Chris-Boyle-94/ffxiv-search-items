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
server.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

server.use("/items", itemsRouter);
server.use("/users", usersRouter);
server.use("/favorites", favoritesRouter);

if (process.env.NODE_ENV === "production") {
    server.use(express.static(path.resolve(__dirname, "../client/build")));
    server.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/public", "index.html"));
    });
}

server.get("/", (req, res) => {
    res.json({ message: "api is up and running" });
});

module.exports = server;
