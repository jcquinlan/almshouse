const mongoose = require('mongoose');
const HouseSchema = require('../schema/HouseSchema.js');

var HouseModel = mongoose.model('House', HouseSchema);

module.export = HouseModel;