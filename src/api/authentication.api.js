"use strict";

const fetch = require("cross-fetch");
const { handleApiResponse } = require("../util/http.util");
const Locator = require("../util/locator.util");
const meta = {
	name: "Authentication API"
};

module.exports = {
	/**
	 * Log in the given user for the given device via HTTP Basic Auth and Cookies
	 * @param {*} client - Advanced Api Client
	 * @returns response with a valid `sessionid` cookie set.
	 */
	login: function(client) {
		return new Promise(function(resolve, reject) {
			if (!client.isAdvanced)
				reject(
					new Error(
						`The ${meta.name} cannot be accessed with the Simple API Client. It requires using the Advanced API Client.`
					)
				);
			else {
				if (!client._hasCredentials()) {
					reject(new Error("Missing or invalid client credentials"));
				} else {
					const locator = new Locator(client.username);
					const uri = locator.postLogin();
					let params = client._authorizeRequest({ method: "POST", credentials: "same-origin" });
					fetch(uri, params)
						.then(response => handleApiResponse(response))
						.then(json => {
							resolve(json);
						})
						.catch(e => {
							reject(e);
						});
				}
			}
		});
	},

	/**
	 * Log out the given user for the given device.
	 * @param {*} client - Advanced Api Client
	 */
	logout: function(client) {
		return new Promise(function(resolve, reject) {
			if (!client.isAdvanced)
				reject(
					new Error(
						`The ${meta.name} cannot be accessed with the Simple API Client. It requires using the Advanced API Client.`
					)
				);
			else {
				if (!client._hasCredentials()) {
					reject(new Error("Missing or invalid client credentials"));
				} else {
					const locator = new Locator(client.username);
					const uri = locator.postLogout();
					let params = client._authorizeRequest({ method: "POST", credentials: "same-origin" });
					fetch(uri, params)
						.then(response => handleApiResponse(response))
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
};
