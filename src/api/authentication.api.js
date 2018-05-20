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
module.exports = {
	login: function (username) {
		return (new Promise(function (resolve, reject) {

		}));
	},
	logout: function (username) {
		return (new Promise(function (resolve, reject) {

		}));
	}
}
