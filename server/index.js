var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var axios = require('axios');

var app = express();
var db = require('./db/mongoose.js');

var createHouse = require('./controllers/HouseController').createHouse;
var HousemateController = require('./controllers/HousemateController');

db.once('open', function() {
    console.log('Database connected!');
});

// Authentication Middleware
const checkJwt = require('./auth/jwt.js').checkJwt;

// Environment Configuration
const PORT_NUMBER = require('./config.js').DEV_PORT;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.json({ payload: 'It\'s working!' });
});

app.get('/private', checkJwt, (req, res) => {
    return res.json({ payload: req.user });
});

app.post('/houses', checkJwt, (req, res) => {
    console.log(createHouse);
    return createHouse(req, res) 
});

app.post('/housemates', checkJwt, HousemateController.createHousemate);
app.post('/housemates/:id', checkJwt, HousemateController.editHousemate);
app.get('/housemates', checkJwt, HousemateController.getHousemates);

console.log(`Listening on port ${ PORT_NUMBER }`);
app.listen(PORT_NUMBER);