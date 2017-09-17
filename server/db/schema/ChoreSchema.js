var mongoose = require('mongoose');
var NextDue = require('./NextDue.js').nextDueModel;

var ChoreSchema = mongoose.Schema({
    name: String,
    housemates: [HousemateSchema],
    frequency: Number,
    notes: String,
    icon: String,
});

exports.choreModel = Chore;