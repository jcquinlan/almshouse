var mongoose = require('mongoose');
var HousemateSchema = require('./HousemateSchema');

var HouseSchema = mongoose.Schema({
    name: String,
    address: String,
    housemates: [HousemateSchema],
    createdAt: Date,
});

module.export = HouseSchema;