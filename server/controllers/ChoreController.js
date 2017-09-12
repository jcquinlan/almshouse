var db = require('../firebase.js').db;
var Chore = require('../models/Chore.js').choreModel;

class ChoreController {
    constructor() {
        this.chores = db.ref('core/chores');
    }

    createChore(chore) {
         return this.chores.set({ [chore.id]: chore });
    }

    getChores() {
        return this.chores.once('value');
    }

    getChore(choreId) {
        return this.chores.orderByValue().equalTo(choreId);
    }
}

exports.choreController = new ChoreController();