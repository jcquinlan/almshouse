const HouseModel = require('../db/models/HouseModel');
const responses = require('../db/helpers/responseGenerators');

const createHouse = (req, res) => {
    const options = req.body;

    const newHouse = new HouseModel(options);

    newHouse.save((error, newHouse => {
        return responses.createdResponse(res, newHouse);
    }));
}

module.exports = {
    createHouse: createHouse,
}