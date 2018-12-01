"use strict";
const path = require("path");
const fetch = require("node-fetch");
const outputUtil = require("util-box").outputUtil;
const httpUtil = require("util-box").httpUtil;
const Promise = require("bluebird");
const { error, success, debug } = outputUtil;
const HOMEDIR = path.join(__dirname, "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const Locator = require(path.join(SRCDIR, "util", "locator.util"));
const apiConfiguration = require(path.join(HOMEDIR, "config", "api.config"));
const CONSTANTS = apiConfiguration.constants;
class SuggestionsApi {
	getSuggestions(
		client,
		count = CONSTANTS.DEFAULT_COUNT,
		format = CONSTANTS.FORMAT_DEFAULT
	) {
		return new Promise((resolve, reject) => {
			const locator = new Locator(client.username);
			const uri = locator.suggestionsUri(count, format);
			let params = client._authorizeRequest({ method: "GET" });
			fetch(uri, params)
				.then(response => httpUtil.handleApiResponse(response))
				.then(json => {
					resolve(json);
				})
				.catch(e => {
					reject(e);
				});
		});
	}
}

module.exports = new SuggestionsApi();
