var guid = require('../utility.js').guid;
var moment = require('moment');

class Log {
    constructor(housemate, chore, date = moment().format()) {
        this.id = guid();
        this.housemate = housemate;
        this.chore = chore;
        this.date = date;
    }
}

exports.logModel = Log;