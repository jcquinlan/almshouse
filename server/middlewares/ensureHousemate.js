const buildMetadataKey = require('../utility').buildMetadataKey;

const ensureHousemate = (req, res, next) => {
    const housemate = req.user[buildMetadataKey()].housemate;
    if(!housemate) {
        res.status(400)
        res.json({ error: 'User has not created a housemate.' });
    } else {
        next();
    }
}

module.exports = ensureHousemate;