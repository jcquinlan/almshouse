var Log = require('../models/Log.js').logModel;
var HousemateController = require('./HousemateController.js').housemateController;
var ChoreController = require('./ChoreController.js').choreController;

class LogController {
    constructor() {
        
    }

    async fetchHousemate(housemateId) {
    }

    async fetchChore(choreId) {
    }

    async prepareLog(housemateId, choreId, date) {

    }

    async createLog(housemateId, choreId, date) {

    }

    getLogs() {

    }
}

exports.logController = new LogController();