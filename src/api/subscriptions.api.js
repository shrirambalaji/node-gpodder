"use strict";
const path = require("path");
const fetch = require("node-fetch");
const { error, success, debug, httpUtil } = require("util-box");
const Promise = require("bluebird");
const SRCDIR = path.join(__dirname, "..", "..", "src");
const Locator = require(path.join(SRCDIR, "util", "locator.util"));
const SIMPLE_FORMATS = ["opml", "json", "txt"];
class SubscriptionsApi {
	get(client, deviceId, format = "opml") {
		return new Promise((resolve, reject) => {
			if (!client._hasCredentials()) {
				reject(new Error("Missing or invalid client credentials"));
			} else {
				if (!deviceId) {
					reject(new Error("Missing or invalid parameters: deviceId"));
				}
				if (!SIMPLE_FORMATS.includes(format)) {
					reject(new Error(`Unsupported Subscription Format: ${format}`));
				}
				const locator = new Locator(client.username);
				// initialize locator with username
				fetch(locator.subscriptionsUri(deviceId, format))
					.then(response => httpUtil.handleApiResponse(response))
					.then(json => resolve(json))
					.catch(err => reject(err));
			}
		});
	}
}

module.exports = new SubscriptionsApi();
