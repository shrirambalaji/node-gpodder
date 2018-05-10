const path = require("path");
const HOMEDIR = path.join(__dirname, "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const auth = require(path.join(SRCDIR, ""));

function SimpleClient(username, password, host) {
  this.username = username;
  this.password = password;
  this.host = host;
}

SimpleClient.prototype.getSubscriptions = () => {
  // get subscriptions for the specified user
};

SimpleClient.prototype.putSubscriptions = () => {
  // put subscriptions
};

SimpleClient.prototype.getSuggestions = () => {
  // get Suggestions
};

module.exports = SimpleClient;
