var mongoose = require('mongoose');

var HousemateSchema = mongoose.Schema({
    oauthId: String,
    firstName: String,
    lastName: String,
    phone: String,
});

HousemateSchema.methods.fullName = () => {
    return this.firstName + ' ' + this.lastName;
}

module.exports = HousemateSchema;