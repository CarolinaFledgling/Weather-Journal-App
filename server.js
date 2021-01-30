// Setup empty JS Object to act as endpoint for all routes

projectData = {};

const express = require('express');

const app = express();

// Middleware 

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

// Setup Server

const port = 3000;
const server = app.listen(port, listening);

function listening() {
    console.log(`running on localhost: ${port}`);
};


//GET route
app.get('/all', sendData);

function sendData(req, res) {
    res.send(projectData)
    res.send(console.log('hello'))
}



// Post route 

app.post('/add', postData);

function postData(req, res) {
    projectData = req.body;
    res.send({
        message: 'post recived'
    });
    console.log(projectData)
}