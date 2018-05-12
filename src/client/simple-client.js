const path = require("path");
const HOMEDIR = path.join(__dirname, "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const api = require(path.join(SRCDIR, "lib", "api"));
const FORMAT = "json"

function SimpleClient(username, password, host) {
  this.username = username;
  this.password = password;
  this.host = host;
  this.hasCredentials = false;
  if(this.username && this.password && this.host) {
    this.hasCredentials = true;
  }
}

SimpleClient.prototype.getSubscriptions =  function(deviceId) {
  const subscriptionsApi = api.Subscriptions;
  subscriptionsApi.get(this, deviceId, FORMAT);
  // get subscriptions for the specified user
};

SimpleClient.prototype.putSubscriptions =  function() {
  // put subscriptions
};

SimpleClient.prototype.getSuggestions =  function() {
  // get Suggestions
};

module.exports = SimpleClient;
