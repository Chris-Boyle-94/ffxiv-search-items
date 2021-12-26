const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const itemsRouter = require("./items/items-router");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/items", itemsRouter);

server.get("/", (req, res) => {
    res.json({ message: "api is up and running" });
});

module.exports = server;
