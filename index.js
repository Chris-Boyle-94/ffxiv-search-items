require("dotenv").config();

const port = process.env.PORT || 5000;
const server = require("./back-end/api/app");

server.listen(port, () => {
    console.log(`Listening on ${port}`);
});
