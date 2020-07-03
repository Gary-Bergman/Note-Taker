const express = require("express");
const server = express();
const path = require("path");
const PORT = 8080;

// use, get, post, delete

server.listen((PORT), () => {
    console.log("Server has started listening on port: " + PORT);
})

