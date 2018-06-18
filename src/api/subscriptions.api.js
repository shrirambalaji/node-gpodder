"use strict";
const path = require("path");
const fetch = require("node-fetch");
const { error, success, debug } = require("util-box").outputUtil;
const httpUtil = require("util-box").httpUtil;
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
				if (!SIMPLE_FORMATS.includes(format)) {
					reject(new Error(`Unsupported Subscription Format: ${format}`));
				}
				const locator = new Locator(client.username);
				// initialize locator with username and host
				let params = {
					method: "GET",
					headers: {
						Authorization: `Basic ${client.username}:${client.password}`
					}
				};
				let uri = locator.subscriptionsUri(deviceId, format);
				fetch(uri, params)
					.then(response => httpUtil.handleApiResponse(response))
					.then(json => {
						resolve(json);
					})
					.catch(err => reject(err));
			}
		});
	}
}

module.exports = new SubscriptionsApi();
