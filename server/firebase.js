var admin = require("firebase-admin");
var serviceAccount = require("./credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://almshouse-592ec.firebaseio.com"
});

// Create the link to our remote database.
var db = admin.database();
var auth = admin.auth();

exports.db = db;
exports.auth = auth;