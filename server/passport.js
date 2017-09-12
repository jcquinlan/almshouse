const passport = require('passport');
const OAuthStrat = require('passport-oauth');
const AUTH_CLIENT = require('./0auth');

const strategy = new OAuthStrategy({
    domain:       AUTH_CLIENT.DOMAIN,
    clientID:     AUTH_CLIENT.CLIENT_ID,
    clientSecret: AUTH_CLIENT.CLIENT_SECRET,
    callbackURL: AUTH_CLIENT.CALLBACK_URL,
  },
  function(token, tokenSecret, profile, done) {
    return done(null, profile);
  }
);

passport.use(strategy);

module.exports = passport;