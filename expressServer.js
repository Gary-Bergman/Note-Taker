
// Dependencies
// =============================================================const express = require("express");
const express = require("express");
const path = require("path");
const fs = require('fs');
const bodyParser = require('body-parser')
// var morgan = require('morgan')

// Sets up the Express App
// =============================================================
const server = express();
const PORT = process.env.PORT || 8080;

// Sets morgan which feeds data to the terminal for developers' sake
// server.use(morgan('combined'));

// Sets up the Express app to handle data parsing
// Stack overflow has good explanation of why this is needed: 
//https://stackoverflow.com/questions/39870867/what-does-app-usebodyparser-json-do
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());


// Static allows the server to make connections between the files in the folder and sub-folders of "public" in relation to the gets we've accessed
server.use(express.static("public"));

// Routes
// =============================================================

// Get index page
server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
})

// Get Notes Page
server.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
})

// Get notes from db 
server.get("/api/notes", (req, res) => {
    fs.readFile(__dirname + '/db/db.json', 'utf-8', function (err, data) {
        if (err)
            throw err;
        // creates variable to parse string back to object
        let file = JSON.parse(data);
        res.json(file);
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
    let id = 1;
    // Need to read db.json file in order to alter it
    fs.readFile(__dirname + '/db/db.json', 'utf-8', (err, data) => {
        if (err)
            throw err;

        // creates variable to parse string back to object
        let file = JSON.parse(data);
        // creates object variable to grab title and text from req.body
        let newObj = {
            title: req.body.title,
            text: req.body.text,
        };
        // push newly created note (newObj) to file
        file.push(newObj);
        for (var i = 0; i < file.length; i++) {
            file[i].id = id;
            id++;
        }
        // overwrite db.json with newly created note
        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(file), err => {
            if (err)
                throw err;
            // send status and message to web client to show success
            res.status(200).json({ message: "You just wrote a new note. Congratulations!" });
        });
    })
});

//Delete notes from db
server.delete("/api/notes/:id", (req, res) => {
    // res.sendFile(path.join(__dirname + "/db/db.json"));

    fs.readFile(__dirname + '/db/db.json', 'utf-8', function (err, data) {
        if (err) {
            throw err;
        } else {
            // creates variable to parse string back to object
            let file = JSON.parse(data);

            // console.log("Look here: " + req.params.id);

            // Loop through file and splice out object with id matching index of the note chosen by the user to delete 
            for (var i = 0; i < file.length; i++) {
                if (file[i].id == req.params.id) {
                    file.splice(i, 1);
                    console.log(file);
                }
            }

            // overwrite db.json with newly created note
            fs.writeFile(__dirname + '/db/db.json', JSON.stringify(file), function (err) {
                if (err) {
                    throw err;
                } else {
                    // send status and message to web client to show success
                    res.status(200).json({ message: "You just deleted a note. Congratulations!" });
                }
            });
        }
    })
});

// Starts the server to begin listening
// =============================================================
server.listen((PORT), () => {
    console.log("Server has started listening on port: " + PORT);
})
