var guid = require('../utility.js').guid;

class Housemate {
    constructor(firstName, lastName, phone) {
        this.id = guid();
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone || '';
        this.name = firstName + ' ' + lastName;
    }
}

exports.housemateModel = Housemate;