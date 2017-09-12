var API_KEY = require('./api.js').API_KEY;

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

exports.guid = guid;

function generateUrl(endpoint) {
  return `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${ endpoint }/key=${ API_KEY }`
}

exports.generateUrl = generateUrl;