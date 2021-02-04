const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// HTTP and API servers
const app = express();

// middleware that can be used to enable CORS
app.use(cors());

// middleware for Parsing incoming request bodies (only parses urlencoded bodies)
app.use(bodyParser.urlencoded({ extended: false }));

// middleware that only parses json
app.use(bodyParser.json());

module.exports = app;
