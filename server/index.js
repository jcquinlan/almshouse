var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var axios = require('axios');

var app = express();
var db = require('./db/mongoose.js');

const HousemateModel = require('./db/models/HousemateModel');

// Environment Configuration
const PORT_NUMBER = require('./config.js').DEV_PORT;

// Authentication Middleware
const checkJwt = require('./auth/jwt.js').checkJwt;

const responseGenerator = require('./db/helpers/responseGenerators');

const HouseController = require('./controllers/HouseController');
const HousemateController = require('./controllers/HousemateController');

db.once('open', function() {
    console.log('Database connected!');
});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.json({ payload: 'It\'s working!' });
});

app.get('/private', checkJwt, (req, res) => {
    return res.json({ payload: req.user });
});

// Get the housemate for the associated auth0 ID.
app.get('/me', checkJwt, (req, res) => {
    const housemate = HousemateModel.findOne({ authId: req.user.sub }, (error, housemate) => {
        if(error) {
            return responseGenerator.errorResponse(res, 404, error.name);
        }

        return responseGenerator.listResponse(res, housemate);
    });
});

app.post('/houses', checkJwt, HouseController.createHouse);
app.get('/housemates', checkJwt, HousemateController.getHousemates);
app.post('/housemates/self', checkJwt, HousemateController.createSelf);
app.post('/housemates', checkJwt, HousemateController.createHousemate);
app.post('/housemates/:id', checkJwt, HousemateController.editHousemate);


console.log(`Listening on port ${ PORT_NUMBER }`);
app.listen(PORT_NUMBER);