"use strict";
const fetch = require("cross-fetch");
const { outputUtil } = require("util-box");
const { httpUtil } = require("util-box");
const Promise = require("bluebird");
const { debug } = outputUtil;
const Locator = require("../util/locator.util");
const SIMPLE_FORMATS = ["opml", "json", "txt"];
class SubscriptionsApi {
	/**
	 * @api {url} - https://gpoddernet.readthedocs.io/en/latest/api/reference/subscriptions.html
	 * @param {Object} client - Api Client
	 * @param {String} deviceId - ( optional) if specified, returns the subscriptions for a specific device
	 * @param {String} format - subscription response format
	 */
	getDeviceSubscriptions(client, deviceId, format = "opml") {
		return new Promise((resolve, reject) => {
			if (!client._hasCredentials()) {
				reject(new Error("Missing or invalid client credentials"));
			} else {
				if (!SIMPLE_FORMATS.includes(format)) {
					const e = new Error(`Unsupported Subscription Format: ${format}`);
					reject(e);
				} else {
					const locator = new Locator(client.username);
					// initialize locator with username and host
					let params = client._authorizeRequest({ method: "GET" });
					const uri = locator.subscriptionsUri(deviceId, format);
					debug("Request: ", uri, " with options: ", JSON.stringify(params));
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

	/**
	 *
	 * @param {Object} client - Api Client
	 * @param {String} deviceId - unique device identifier that holds the subscriptions to be uploaded
	 * @param {String} format - input subscription response format
	 * @param {Object} urls - subscription urls to be uploaded via PUT request body
	 */
	uploadDeviceSubscriptions(client, deviceId, format = "opml", urls) {
		return new Promise((resolve, reject) => {
			if (!client._hasCredentials()) {
				reject(new Error("Missing or invalid client credentials"));
			} else {
				if (!SIMPLE_FORMATS.includes(format)) {
					const e = new Error(`Unsupported Subscription Format: ${format}`);
					reject(e);
				}
				const locator = new Locator(client.username);
				// initialize locator with username and host
				let params = client._authorizeRequest({ method: "PUT", body: urls });
				const uri = locator.subscriptionsUri(deviceId, format);
				debug("Request: ", uri, "with options: ", params);
				fetch(uri, params)
					.then(response => httpUtil.handleApiResponse(response))
					.then(json => resolve(json))
					.catch(e => reject(new Error(e)));
			}
		});
	}

	/**
	 *
	 * @param {Object} client - Api Client
	 * @param {String} format - subscription response format
	 * @returns {Object} - subscriptions for all devices of the user
	 */
	getAllSubscriptions(client, format = "opml") {
		return new Promise((resolve, reject) => {
			if (!client._hasCredentials()) {
				reject(new Error("Missing or invalid client credentials"));
			} else {
				if (!SIMPLE_FORMATS.includes(format)) {
					const e = new Error(`Unsupported Subscription Format: ${format}`);
					reject(e);
				}
				const locator = new Locator(client.username);

				// initialize locator with username and host
				let params = client._authorizeRequest({ method: "GET" });
				const uri = locator.subscriptionsUri(format);
				debug("Request: ", uri, "with options: ", params);
				fetch(uri, params)
					.then(response => httpUtil.handleApiResponse(response))
					.then(json => {
						resolve(json);
					})
					.catch(e => {
						reject(e);
					});
			}
		});
	}

	/**
	 *
	 * @param {Object} client - Api Client
	 * @param {String} deviceId - unique device Identifier
	 * @param {number} since - timestamp
	 * @returns {Object} -  subscription changes since the timestamp provided in the since parameter
	 */
	getSubscriptionChanges(client, deviceId, since) {
		return new Promise((resolve, reject) => {
			if (!client._hasCredentials()) {
				reject(new Error("Missing or invalid client credentials"));
			} else {
				const locator = new Locator(client.username);

				// initialize locator with username and host
				let params = client._authorizeRequest({ method: "GET" });
				const uri = locator.subscriptionUpdatesUri(deviceId, since);
				debug("Request: ", uri, "with options: ", params);
				fetch(uri, params)
					.then(response => httpUtil.handleApiResponse(response))
					.then(json => {
						resolve(json);
					})
					.catch(e => {
						reject(new Error(e));
					});
			}
		});
	}

	/**
	 *
	 * @param {Object} client - api client
	 * @param {String} deviceId - unique device identifier that holds the changes to be uploaded
	 * @param {Object} body - subscription changes data to be uploaded via POST request body
	 */
	uploadSubscriptionChanges(client, deviceId, body) {
		return new Promise((resolve, reject) => {
			if (!client._hasCredentials()) {
				reject(new Error("Missing or invalid client credentials"));
			} else {
				if (!body || !deviceId) reject(new Error("Missing or invalid parameters: deviceId, body"));
				else {
					const locator = new Locator(client.username);
					let params = client._authorizeRequest({ method: "POST", body: body });
					const uri = locator.addRemoveSubscriptionsUri(deviceId);
					debug("Request: ", uri, "with options: ", params);
					fetch(uri, params)
						.then(response => httpUtil.handleApiResponse(response))
						.then(json => resolve(json))
						.catch(e => {
							reject(e);
						});
				}
			}
		});
	}
}

module.exports = new SubscriptionsApi();
