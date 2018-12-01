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
const meta = { name: "FavoritesApi" };

// Fetch Favorite Episodes
class FavoritesApi {
	getFavorites(client) {
		return new Promise((resolve, reject) => {
			if (!client.isAdvanced) {
				const notAdvancedError = `The ${
					meta.name
				} cannot be accessed with the Simple API Client. It requires using the Advanced API Client.`;
				reject(new Error(notAdvancedError));
			} else {
				if (!client._hasCredentials()) {
					reject(new Error("Missing or invalid client credentials"));
				} else {
					const locator = new Locator(client.username);
					const uri = locator.favoriteEpisodesUri();
					let params = client._authorizeRequest({
						method: "GET",
						credentials: "same-origin"
					});
					fetch(uri, params)
						.then(response => httpUtil.handleApiResponse(response))
						.then(json => {
							resolve(json);
						})
						.catch(e => {
							reject(e);
						});
				}
			}
		});
	}
}

module.exports = new FavoritesApi();
