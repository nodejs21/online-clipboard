const Note = require('../models/note.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', 'https://yabbale-01.herokuapp.com');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // res.setHeader('Access-Control-Allow-Credentials', true);
    // console.log(req.params);
    
    // Create a Note
    const newNote = new Note({
        urlId: req.params.urlId || "Untitled Note", 
        content: req.params.content
    });
    
    
    Note.find({"urlId": req.params.urlId})
    .then(note => {
        if(note.length == 0) {
            // Save Note in the database
            newNote.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Note."
                });
            });
        } else {
            res.status(202).send("Clipboard name already exists!");
        }
        
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.urlId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.urlId
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Note.find()
    // .then(notes => {
    //     res.send(notes);
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while retrieving notes."
    //     });
    // });
};

// Find a single note with a urlId
exports.findOne = (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', 'https://yabbale-01.herokuapp.com');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // res.setHeader('Access-Control-Allow-Credentials', true);
    Note.find({"urlId": req.params.urlId})
    .then(note => {
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.urlId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.urlId
        });
    });
};

// Update a note identified by the urlId in the request
exports.update = (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', 'https://yabbale-01.herokuapp.com');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // res.setHeader('Access-Control-Allow-Credentials', true);
    // Find note and update it with the request params
    Note.findOneAndUpdate({"urlId": req.params.urlId}, {
        urlId: req.params.urlId || "Untitled Note",
        content: req.body.content
    }, {new: true, upsert: true})
    .then(note => {
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.urlId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.urlId
        });
    });
};