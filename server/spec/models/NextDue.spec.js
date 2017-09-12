var Chore = require('../../models/Chore.js').choreModel;
var Housemate = require('../../models/Housemate.js').housemateModel;

describe('The NextDue model class', () => {
    beforeEach(() => {
        this.name = 'Fake Chore';
        this.freq = 48;
        this.hm1 = new Housemate('James', 'Quinlan');
        this.hm2 = new Housemate('Cole', 'Bush');
        this.hm3 = new Housemate('Quinn', 'Kender');
        this.hm4 = new Housemate('Matt', 'Roth');

        this.housemates = {
            [this.hm1.id]: this.hm1,
            [this.hm2.id]: this.hm2,
            [this.hm3.id]: this.hm3
        }

        this.chore = new Chore(this.name, this.freq, null, this.housemates);
        this.nextDue = this.chore.nextDue;
    });

    it('has an id', () => {
        expect(this.nextDue.hasOwnProperty('id')).toEqual(true);
    });

    it('has housemates', () => {
        expect(this.nextDue.hasOwnProperty('housemates')).toEqual(true);
        expect(this.nextDue.housemates).toEqual(Object.values(this.housemates));
    });

    describe("can reorder who has to do the chore next", () => {
        it("reorders the housemates", () => {
            const doer = this.hm1;
            this.nextDue.updateHousemateOrder(doer);

            expect(this.nextDue.housemates.length).toEqual(3);
            expect(this.nextDue.housemates[0]).toEqual(this.hm2);
            expect(this.nextDue.housemates[this.nextDue.housemates.length - 1]).toEqual(this.hm1);
        });
    });

    describe("it can update the list of housemates", () => {
        it("reconciles two lists of housemates", () => {
            const newHousemates = [this.hm2, this.hm3, this.hm4];
            this.chore.nextDue.updateHousemates(newHousemates);

            expect(this.chore.nextDue.housemates).toEqual(newHousemates);
        });
    });
});