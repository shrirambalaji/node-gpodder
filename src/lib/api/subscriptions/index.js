const path = require("path");
const fetch = require("node-fetch");
const { error, success, debug, httpUtil } = require("util-box");
const HOMEDIR = path.join(__dirname, "..", "..", "..", "..");
const config = require(path.join(HOMEDIR, "config", "prod.config"));
const SIMPLE_FORMATS = ["opml", "json", "txt"];

const subscriptions = {};
subscriptions.uri = `${config.api.base}${config.api.mountpoints.subscriptions}`;
subscriptions.get = async function(username, deviceId, format = "opml") {
  if(!username) {
    throw new Error("Missing or invalid parameters: username")
  }
  else {
  let reqUri = `${this.uri}/${username}/${deviceId}.${format}}`;
  if(!SIMPLE_FORMATS.includes(format)) {
    throw new Error("Unsupported Subscription Format");
  }
  let response = await fetch(reqUri);
  if (!/2[0-9]/.test(response.status)) {
    throw new Error(`Expected 2xx found ${response.status}`);
  } else {
      let body = await res.json();
      return body;
    }
  }  
};
  
module.exports = subscriptions;
