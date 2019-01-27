"use strict";

const fetch = require("cross-fetch");
const { handleApiResponse } = require("../util/http.util");
const Promise = require("bluebird");
const Locator = require("../util/locator.util");
const meta = { name: "DeviceApi" };

class DeviceApi {
	getDevices(client) {
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
					const uri = locator.deviceListUri();
					let params = client._authorizeRequest({
						method: "GET"
					});
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

	// FIXME: issues while re-updating same device more than once
	updateDevices(client, deviceId, body) {
		const { caption, type } = body;
		return new Promise((resolve, reject) => {
			if (!client.isAdvanced) {
				const notAdvancedError = `The ${
					meta.name
				} cannot be accessed with the Simple API Client. It requires using the Advanced API Client.`;
				reject(new Error(notAdvancedError));
			} else {
				if (!client._hasCredentials()) {
					reject(new Error("Missing or invalid client credentials"));
				} else if (!body || !caption || !type || !deviceId) reject(new Error("Missing or invalid required parameters"));
				else {
					const locator = new Locator(client.username);
					const uri = locator.deviceSettingsUri(deviceId);
					let params = client._authorizeRequest({
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: body
					});
					fetch(uri, params)
						.then(response => {
							handleApiResponse(response);
						})
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

	getDeviceUpdates(client, deviceId, since = null, includeActions = false) {
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
					const uri = locator.deviceUpdatesUri(deviceId, since, includeActions);
					let params = client._authorizeRequest({
						method: "GET"
					});
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
}

module.exports = new DeviceApi();
