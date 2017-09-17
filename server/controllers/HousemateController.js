const HousemateModel = require('../db/models/HousemateModel');
const responses = require('../db/helpers/responseGenerators');

const createHousemate = (req, res) => {
    const options = req.body;

    var newHousemate = new HousemateModel(options);

    newHousemate.save((error, housemate) => {
        return responses.createdResponse(res, housemate);
    });
}

const getHousemates = (req, res) => {
    HousemateModel.find((error, housemates) => {
        return responses.listResponse(res, housemates);
    });
}

const editHousemate = (req, res) => {
    const options = req.body;
    const id = req.params.id;

    HousemateModel.findOneAndUpdate({ _id: id }, options, {}, (error, housemate) => {
        if(error) return responses.errorResponse(res, 400, 'Error updating Housemate.');

        return responses.updatedResponse(res, housemate);
    });
}

module.exports = {
    createHousemate,
    getHousemates,
    editHousemate
};
