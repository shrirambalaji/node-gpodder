const path = require("path");
const HOMEDIR = path.join(__dirname, "..", "..");
const apiConfiguration = require(path.join(HOMEDIR, "config", "api.config"));
module.exports = {
	getSubscriptionsUri: function(username, deviceId, format = "opml") {
		let uri = `${apiConfiguration.base}${apiConfiguration.mountpoints.subscriptions}`;
		// truncate dot if present in the file format
		if (/^\./.test(format)) {
			format = format.substr(1);
		}
		return `${uri}/${username}/${deviceId}.${format}`;
	}
};
