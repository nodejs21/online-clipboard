module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // // Retrieve all Notes
    app.get('/notes/:urlId', notes.create);

    // Retrieve a single Note with urlId
    app.get('/notes/get/:urlId', notes.findOne);

    // Update a Note with urlId
    app.post('/notes/push/:urlId', notes.update);

}