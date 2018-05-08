const path = require("path");
const HOMEDIR = path.join(__dirname, "..", "..")
const api = require(path.join(HOMEDIR))
class SimpleClient {
	constructor(username, password, host) {
		this.username = username;
		this.password = password;
		this.host = host;
	}
};

module.exports = SimpleClient;
