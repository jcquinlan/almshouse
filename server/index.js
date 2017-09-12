var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var axios = require('axios');

var app = express();

var housematesController = require('./controllers/HousemateController.js').housemateController;
var choresController = require('./controllers/ChoreController.js').choreController;
var logsController = require('./controllers/LogController.js').logController;
var Housemate = require('./models/Housemate.js').housemateModel;
var Chore = require('./models/Chore.js').choreModel;
var TestScheduler = require('./scheduling/Test.js').TestScheduler;

const checkJwt = require('./auth/jwt.js').checkJwt;

const PORT_NUMBER = 3002;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.json({ payload: 'It\'s working!' });
});

app.get('/private', checkJwt, (req, res) => {
    return res.json({ payload: 'It\'s working!' });
});

console.log(`Listening on port ${ PORT_NUMBER }`);
app.listen(PORT_NUMBER);