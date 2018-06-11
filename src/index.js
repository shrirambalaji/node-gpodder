// Hello Node Gpodder!
const path = require("path");
const { SimpleClient } = require("./client/simple-client");
const { AdvancedClient } = require("./client/advanced-client");

module.exports = {
	SimpleClient,
	AdvancedClient
};
// export default "./api";
