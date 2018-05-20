"use strict";
const path = require("path");
const fetch = require("node-fetch");
const {
	error,
	success,
	debug,
	httpUtil
} = require("util-box");
const Promise = require("bluebird");
const SRCDIR = path.join(__dirname, "..", "..", "src");
const Locator = require(path.join(SRCDIR, "util", "locator.util"));
const SIMPLE_FORMATS = ["opml", "json", "txt"];
module.exports = {
	get: function (client, deviceId, format = "opml") {
		return new Promise(function (resolve, reject) {
			if (!client.hasCredentials()) {
				reject(new Error("Missing or invalid client credentials"));
			} else {
				if (!deviceId) {
					reject(new Error("Missing or invalid parameters: deviceId"));
				}
				if (!SIMPLE_FORMATS.includes(format)) {
					reject(new Error(`Unsupported Subscription Format: ${format}`));
				}
				// initialize locator with username
				const locator = new Locator(client.username);
				fetch(locator.subscriptionsUri(deviceId, format))
					.then(response => httpUtil.handleApiResponse(response))
					.then(json => resolve(json))
					.catch(err => reject(err));
			}
		});
	}
};
