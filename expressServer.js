const express = require("express");
const server = express();
const path = require("path");
const { static } = require("express");
const { fstat } = require("fs");
const PORT = 8080;

// use, get, post, delete
// need to fs.writefile to db.json


server.listen((PORT), () => {
    console.log("Server has started listening on port: " + PORT);
})

// Static allows the server to make connections between the files in the folder and sub-folders of "public" in relation to the gets we've accessed
server.use(express.static("public"))

// Get index page
server.get("/", (req, res) => {
    // res.send("Welcom to my page.");
    // if (broken){
    //     res.status(404).json({ message: "Not Found" });
    // }
    // res.status(404).send({message: "Not Found"});
    res.sendFile(path.join(__dirname + "/public/index.html"));
})


// Get Notes Page
server.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
})


// Get notes from db 
server.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/db/db.json"));
})

// Post notes to db
server.post("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/db/db.json"));
})

// Delete notes from db
server.delete("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/db/db.json"));
})

