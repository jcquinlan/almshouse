var guid = require('../utility.js').guid;
var NextDue = require('./NextDue.js').nextDueModel;

class Chore {
    constructor(name, frequency, notes, housemates, icon) {
        this.id = guid();
        this.name = name;
        this.housemates = housemates || {};
        this.frequency = frequency; // Frequency in hours
        this.notes = notes || ''; // Short description
        this.icon = icon || '';
        this.nextDue = new NextDue(this);
    }

    addHousemates(newHousemates) {
        const housemates = this.housemates || {};

        newHousemates.forEach(housemate => {
            this.housemates[housemate.id] = housemate;
        });

        this.nextDue.updateHousemates(Object.values(this.housemates));
    }

    removeHousemate(housemate) {
        const housemates = this.housemates || {};

        if(this.hasOwnProperty(housemate.id)) {
            delete housemates[housemate.id];
            this.housemates = housemates;
        }
    }
}

exports.choreModel = Chore;