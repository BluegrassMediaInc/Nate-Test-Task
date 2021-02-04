const express = require("express");
const client = require("./client.route");

const router = express.Router();

router.use("/client", client);

module.exports = router;
