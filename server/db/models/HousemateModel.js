const mongoose = require('mongoose');
const HousemateSchema = require('../schema/HousemateSchema');

var HousemateModel = mongoose.model('Housemate', HousemateSchema);

module.exports = HousemateModel;