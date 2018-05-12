const path = require("path");
const fetch = require("node-fetch");
const { error, success, debug, httpUtil } = require("util-box");
const Promise = require("bluebird");
const HOMEDIR = path.join(__dirname, "..", "..", "..", "..");
const config = require(path.join(HOMEDIR, "config", "prod.config"));
const SIMPLE_FORMATS = ["opml", "json", "txt"];
const subscriptions = {};

subscriptions.uri = `${config.api.base}${config.api.mountpoints.subscriptions}`;
subscriptions.get =  function(client, deviceId, format = "opml") {
  return new Promise(function(resolve, reject){
    if(!client.hasCredentials) {
      reject(new Error("Missing or invalid parameters: username"));
    }
    else {
      if(!SIMPLE_FORMATS.includes(format)) {
        reject(new Error("Unsupported Subscription Format"));
      }
      let reqUri = `${this.uri}/${client.username}/${deviceId}.${format}}`;
      fetch(reqUri)
        .then(response => httpUtil.handleApiResponse(response))
        .then(json => resolve(json))
        .catch(err => error(err.message))
      } 
  }); 
};
  
// subscriptions.put = function(client, deviceId, data) {

// };

module.exports = subscriptions;
