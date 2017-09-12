var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var axios = require('axios');

var auth = require('./firebase.js').auth;

var housematesController = require('./controllers/HousemateController.js').housemateController;
var choresController = require('./controllers/ChoreController.js').choreController;
var logsController = require('./controllers/LogController.js').logController;

var Housemate = require('./models/Housemate.js').housemateModel;
var Chore = require('./models/Chore.js').choreModel;
var app = express();

var TestScheduler = require('./scheduling/Test.js').TestScheduler;

var generateUrl = require('./utility').generateUrl;

const PORT_NUMBER = 3002;

app.use(bodyParser.json());
app.use(cors());

/**********
GENERAL 
***********/
// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    axios.post(generateUrl('verifyPassword'), { email, password, returnSecureToken: true })
        .then(res => {
            console.log(res);
        });
});

// Register
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    auth.createUser({ email, password })
        .then(user => {
            res.status(201);
            res.json(user);
        })
        .catch(error => {
            console.log(error);
            res.status(400);
            res.send(error);
        })
});

/**********
HOUSEMATES
***********/
// Retrieve list of all Housemates
app.get('/housemates', async (req, res) => {
    const housematesList = await housematesController.getHousemates();
    res.json(housematesList);
});

// Create new Housemate
app.post('/housemates', async (req, res) => {
    const { firstName, lastName } = req.body;
    const housemate = new Housemate(firstName, lastName);
    const newHousemateError = await housematesController.createHousemate(housemate);

    if(newHousemateError === undefined) {
        res.json({ user: housemate });
    } else {
        res.error('Failed to create new housemate.');
    }
});

/**********
CHORES
***********/
// Retrieve list of all Chores
app.get('/chores', async (req, res) => {
    const choresList = await choresController.getChores();
    res.json(choresList);
});

// Create new Chore
app.post('/chores', async (req, res) => {
    const { name, frequency, notes } = req.body;
    const chore = new Chore(name, frequency, notes);
    const newChoreError = await choresController.createChore(chore);

    if(newChoreError === undefined) {
        res.json({ chore });
    } else {
        res.json({ error: 'Failed to create new chore.' });
    }
});

/**********
LOGS
***********/
// Retrieve list of all Logs
app.get('/logs', async (req, res) => {
    const logsList = await logsController.getLogs();
    res.json(logsList);
});

// Create new Log
app.post('/logs', async (req, res) => {
    const { housemateId, choreId, date } = req.body;
    const newLogError = await logsController.createLog(housemateId, choreId, date);

    if(newLogError === undefined) {
        res.json({ log });
    } else {
        res.json({ error: 'Failed to create new log.' });
    }
});

console.log(`Listening on port ${ PORT_NUMBER }`);
app.listen(PORT_NUMBER);