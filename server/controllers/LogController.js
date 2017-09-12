var db = require('../firebase.js').db;
var Log= require('../models/Log.js').logModel;
var HousemateController = require('./HousemateController.js').housemateController;
var ChoreController = require('./ChoreController.js').choreController;

class LogController {
    constructor() {
        this.logs = db.ref('core/log');
    }

    async fetchHousemate(housemateId) {
        return await HousemateController.getHousemate(housemateId);
    }

    async fetchChore(choreId) {
        return await ChoreController.getChore(choreId);
    }

    async prepareLog(housemateId, choreId, date) {
        const housemate = await this.fetchHousemate(housemateId).val();
        const chore = await this.fetchChore(choreId).val();

        return new Log(housemate, chore, date);
    }

    async createLog(housemateId, choreId, date) {
        const log = await this.prepareLog(housemateId, choreId, date);
        console.log(log);

         return this.logs.set({ [log.id]: log });
    }

    getLogs() {
        return this.logs.once('value');
    }
}

exports.logController = new LogController();