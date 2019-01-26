"use strict";

const fetch = require("cross-fetch");
const httpUtil = require("util-box").httpUtil;
const Promise = require("bluebird");
const Locator = require("../util/locator.util");
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
