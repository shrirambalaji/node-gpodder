"use strict";
const path = require("path");
const fetch = require("node-fetch");
const { error, success, debug, httpUtil } = require("util-box");
const Promise = require("bluebird");
const SRCDIR = path.join(__dirname, "..", "..", "src");
const locator = require(path.join(SRCDIR, "util", "locator.util"));
const SIMPLE_FORMATS = ["opml", "json", "txt"];
module.exports = {
    login: function(username) {

    },
    logout: function(username) {

    }
}