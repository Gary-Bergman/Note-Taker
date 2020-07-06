const express = require("express");
const server = express();
const path = require("path");
const { static } = require("express");
const { fstat } = require("fs");
const fs = require('fs');
const bodyParser = require('body-parser')
var morgan = require('morgan')
const PORT = process.env.PORT || 8080;

server.use(morgan('combined'));

var dbTracker = [];

// use, get, post, delete
// need to fs.writefile to db.json

// Stack overflow has good explanation of why this is needed: https://stackoverflow.com/questions/39870867/what-does-app-usebodyparser-json-do
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
server.use(bodyParser.json())


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
    fs.readFile(__dirname + '/db/db.json', 'utf-8', function (err, data) {
        if (err) {
            throw err;
        } else {
            // creates variable to parse string back to object
            let file = JSON.parse(data);
            // creates object variable to grab title and text from req.body
            dbTracker = [].concat(file);
            res.json(file);
        }
    })
})

// Always keep this as the very last GET
// Anything other than notes or api/notes will go to homepage
server.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
})

// Post notes to db
server.post("/api/notes", (req, res) => {
    console.log(req.body);
    // res.status(200).json({ message: "Hello?" });

    // Need to read db.json file in order to alter it
    fs.readFile(__dirname + '/db/db.json', 'utf-8', function (err, data) {
        if (err) {
            throw err;
        } else {
            // creates variable to parse string back to object
            let file = JSON.parse(data);
            // creates object variable to grab title and text from req.body
            let newObj = {
                title: req.body.title,
                text: req.body.text
            };
            // push newly created note (newObj) to file
            file.push(newObj);
            dbTracker = file;


            // overwrite db.json with newly created note
            fs.writeFile(__dirname + '/db/db.json', JSON.stringify(file), function (err) {
                if (err) {
                    throw err;
                } else {
                    // send status and message to web client to show success
                    res.status(200).json({ message: "You just wrote a new note. Congratulations!" });
                }
            });
        }
    })
});




// Delete notes from db
server.delete("/api/notes/:id", (req, res) => {
    res.sendFile(path.join(__dirname + "/db/db.json"));
})

