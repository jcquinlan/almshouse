var mongoose = require('mongoose');
var HousemateSchema = require('./HousemateSchema');

var HouseSchema = mongoose.Schema({
    createdBy: { type: String, required: true }, // Mongo ID
    name: { type: String, required: true },
    address: { type: String, required: true },
    housemates: [HousemateSchema],
    createdAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

module.exports = HouseSchema;