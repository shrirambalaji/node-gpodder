const path = require("path");
const HOMEDIR = path.join(__dirname, "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const config = require(path.join(HOMEDIR, "config", "api.config"));
const api = require(path.join(SRCDIR, "api"));
const FORMAT = "json";

function SimpleClient(username, password, host) {
	this.username = username;
	this.password = password;
	this.host = host;
	this.userAgent = `node-gpodder`; // this value can be overwritten if needed
}

SimpleClient.prototype.hasCredentials = function() {
	if (this.username && this.password) return true;
	else return false;
};

SimpleClient.prototype.getSubscriptions = function(deviceId) {
	const subscriptionsApi = api.Subscriptions;
	return subscriptionsApi.get(this, deviceId, FORMAT);
	// get subscriptions for the specified user
};

SimpleClient.prototype.putSubscriptions = function() {
	// put subscriptions
};

SimpleClient.prototype.getSuggestions = function() {
	// get Suggestions
};

module.exports = SimpleClient;
