var db = require('../firebase.js').db;
var Housemate = require('../models/Housemate.js').housemateModel;

class HousemateController {
    constructor() {
        this.housemates = db.ref('core/housemates');
    }

    createHousemate(housemate) {
         return this.housemates.set({ [housemate.id]: housemate });
    }

    getHousemates() {
        return this.housemates.once('value');
    }

    getHousemate(housemateId) {
        return this.housemates.orderByValue().equalTo(housemateId);
    }
}

exports.housemateController = new HousemateController();