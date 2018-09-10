const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const cors = require('cors');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 3000;
const corsOptions = {
    origin: ['https://yabbale-01.herokuapp.com', 'chrome-extension://haplcilekkkmjbpejdhhadajdfkhohoc', '*']
}
app.use(cors(corsOptions));

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// serve angular frontend
// app.use(express.static(path.join(__dirname, 'dist')));
// app.get('/', (req, res) => {
//     res.render('index');
// });

// define a simple route
app.get('/', (req, res) => {
    var urlId = shortid.generate();
    res.redirect(`/notes/${urlId}`);
    // res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port 3000");
});