var mongoose = require('mongoose');
var MONGOOSE_PORT = require('../config.js').MONGOOSE_PORT;
var MONGOOSE_NAME = require('../config.js').MONGOOSE_NAME;

mongoose.connect(`mongodb://localhost:${MONGOOSE_PORT}/${MONGOOSE_NAME}`);

var db = mongoose.connection;

module.exports = db;