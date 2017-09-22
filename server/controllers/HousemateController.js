const HousemateModel = require('../db/models/HousemateModel');
const responses = require('../db/helpers/responseGenerators');

const createSelf = (req, res) => {
    const options = req.body;
    // Add id of user making the request
    options.authId = req.user.sub;
    
    var self = new HousemateModel(options);

    self.save((error, self) => {
        if(error) return responses.errorResponse(res, 400, error.message);
        return responses.createdResponse(res, self);
    });
}

const createHousemate = (req, res) => {
    const options = req.body;

    var newHousemate = new HousemateModel(options);

    newHousemate.save((error, housemate) => {
        if(error) return responses.errorResponse(res, 400, 'Error creating new Housemate. Are you missing required fields?');
        return responses.createdResponse(res, housemate);
    });
}

const getHousemates = (req, res) => {
    HousemateModel.find((error, housemates) => {
        if(error) return responses.errorResponse(res, 400, 'Error retrieving Housemates.');
        return responses.listResponse(res, housemates);
    });
}

const editHousemate = (req, res) => {
    const options = req.body;
    const id = req.params.id;

    HousemateModel.findOneAndUpdate({ id: id }, options, {}, (error, housemate) => {
        if(error) return responses.errorResponse(res, 400, 'Error updating Housemate.');
        return responses.updatedResponse(res, housemate);
    });
}

module.exports = {
    createHousemate,
    getHousemates,
    editHousemate,
    createSelf
};
