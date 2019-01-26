"use strict";
const path = require("path");
const fetch = require("cross-fetch");
const outputUtil = require("util-box").outputUtil;
const httpUtil = require("util-box").httpUtil;
const Promise = require("bluebird");
const Locator = require("../util/locator.util");
const apiConfiguration = require("../../config/api.config");
const CONSTANTS = apiConfiguration.constants;

class SuggestionsApi {
	getSuggestions(client, count = CONSTANTS.DEFAULT_COUNT, format = CONSTANTS.FORMAT_DEFAULT) {
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
