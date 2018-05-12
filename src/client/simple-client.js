const path = require("path");
const HOMEDIR = path.join(__dirname, "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const api = require(path.join(SRCDIR, "api"));
const FORMAT = "json";

function SimpleClient(username, password, host) {
	this.username = username;
	this.password = password;
	this.host = host;
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
