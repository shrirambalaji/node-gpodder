const path = require("path");
const B64Encode = require("base-64").encode;
const HOMEDIR = path.join(__dirname, "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const config = require(path.join(HOMEDIR, "config", "api.config"));
const Subscriptions = require(path.join(SRCDIR, "api")).subscriptionsApi;
const Suggestions = require(path.join(SRCDIR, "api")).suggestionsApi;
const FORMAT = "json";

class AdvancedClient {
	/**
	 *
	 * @param {string} username - gpodder username
	 * @param {string} password - gpodder password
	 * @param {string} host - URL of gpodder host
	 * @param {string} userAgent - (optional) userAgent denoting client value
	 */
	constructor(username, password, host, userAgent) {
		this.username = username;
		this.password = password;
		this.host = host;
		this.isAdvanced = true;
		if (!userAgent) this.userAgent = `node-gpodder`;
		else this.userAgent = userAgent;
		// this value can be overwritten if needed
	}

	/**
	 * internal method used to check credentials exist
	 */
	_hasCredentials() {
		if (this.username && this.password) return true;
		else return false;
	}

	/**
	 * internal method used to add Basic HTTP Authentication to the request
	 * @param {*} options - input request options
	 */
	_authorizeRequest(options) {
		if (!options) options = {};
		if (!options.headers) options.headers = {};
		const encodedCredentials = B64Encode(`${this.username}:${this.password}`);
		options.headers["Authorization"] = `Basic ${encodedCredentials}`;
		return options;
	}
}
module.exports = AdvancedClient;
