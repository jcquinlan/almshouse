var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var HousemateSchema = mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    authId: { type: String,  unique: true, default: null },
    firstName: String,
    lastName: String,
    phone: { type: String, required: true },
    email: { type: String, required: true },
    claimed: { type: Boolean, default: false }
});

HousemateSchema.methods.fullName = () => {
    return this.firstName + ' ' + this.lastName;
}

HousemateSchema.plugin(uniqueValidator);

module.exports = HousemateSchema;