const express = require("express");
const server = express();
const path = require("path");
const PORT = 8080;

// use, get, post, delete

server.listen((PORT), () => {
    console.log("Server has started listening on port: " + PORT);
})


server.get("/", (req, res) => {
    // res.send("Welcom to my page.");
    // if (broken){
    //     res.status(404).json({ message: "Not Found" });
    // }
    // res.status(404).send({message: "Not Found"});
    res.sendFile(path.join(__dirname + "/public/index.html"));
})

server.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
})

