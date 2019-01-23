// Hello Node Gpodder!
const path = require("path");
const { SimpleClient } = require("./client/simple-client");
const { AdvancedClient } = require("./client/advanced-client");
const Api = require('./api')
module.exports = {
	SimpleClient,
	AdvancedClient,
	Api
};
