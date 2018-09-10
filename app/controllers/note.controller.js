const Note = require('../models/note.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    console.log(req.params);
    
    // Create a Note
    const note = new Note({
        urlId: req.params.urlId || "Untitled Note", 
        content: req.params.content
    });
    
    // Save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
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
    // Validate Request
    if(!req.params.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    // Find note and update it with the request params
    Note.findOneAndUpdate(req.params.urlId, {
        urlId: req.params.urlId || "Untitled Note",
        content: req.params.content
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