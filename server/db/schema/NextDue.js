var guid = require('../utility.js').guid;
var moment = require('moment');

class NextDue {
    constructor(chore) {
        this.id = guid();
        this.choreId = chore.id;
        this.date = moment().add(chore.frequency, 'hours').format();
        this.housemates = Object.values(chore.housemates);
    }

    get nextHousemate() {
        if(!this.hasOwnProperty('housemates')) return null;
        return this.housemates[0];
    }

    updateHousemateOrder(doer) {
        if(!this.hasOwnProperty('housemates')){
            this.housemates = [];
            return;
        }
        const { housemates } = this;
        const indexOfDoer = housemates.indexOf(doer);

        housemates.splice(indexOfDoer, 1);
        housemates.push(doer);

        this.housemates = housemates;
    }

    updateHousemates(newHousemates) {
        const addedParentHousemates = newHousemates.slice();
        const localHousemates = this.housemates.slice() || [];

        for(let i = 0; i < localHousemates.length; i++) {
            const localHousemate = localHousemates[i];

            if(newHousemates.indexOf(localHousemate) === -1) {
                // If the local housemate is not in the list of parent housemates,
                // remove it.
                this.housemates.splice(i, 1);
            } else {
                // If the local housemate is in the list of parent housemates, remove that user
                // from the list of housemates to be concatenated at the end.
                const indexOfParent = addedParentHousemates.indexOf(localHousemate);
                addedParentHousemates.splice(indexOfParent, 1);
            }
        }

        this.housemates = this.housemates.concat(addedParentHousemates);
    }


}

exports.nextDueModel = NextDue;