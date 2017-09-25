const HouseModel = require('../db/models/HouseModel');
const responses = require('../db/helpers/responseGenerators');

const createHouse = (req, res) => {
    console.log(req.user);
    const options = req.body;
    options.createdBy = req.user.sub;

    var newHouse = new HouseModel(options);

    newHouse.save((error, newHouse) => {
        if(error) return responses.errorResponse(res, 400, 'Error creating new House.');
        return responses.createdResponse(res, newHouse);
    });
}

module.exports = {
    createHouse,
}