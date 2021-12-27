const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res, next) => {
    const { string } = req.query;
    try {
        const response = await axios.get(
            `https://xivapi.com/search?string=${string}&indexes=Item`
        );
        res.status(200).json(response.data.Results);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    const { url } = req.query;
    try {
        const response = await axios.get(`https://xivapi.com${url}`);
        res.status(200).json(response.data);
    } catch (err) {
        next(err);
    }
});

//eslint-disable-next-line
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        custom: "Something went wrong with the items router.",
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;
