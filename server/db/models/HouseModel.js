const mongoose = require('mongoose');
const HouseSchema = require('../schema/HouseSchema');

var HouseModel = mongoose.model('House', HouseSchema);

module.exports = HouseModel;