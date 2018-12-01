const path = require("path");
const test = require("ava");
const HOMEDIR = path.join(__dirname, "..", "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const TESTDIR = path.join(HOMEDIR, "test");
const SimpleClient = require(path.join(SRCDIR, "client", "simple-client"));
const AdvancedClient = require(path.join(SRCDIR, "client", "advanced-client"));
const FavoritesApi = require(path.join(SRCDIR, "api")).FavoritesApi;
let client = null;
let advancedClient = null;
let testDeviceId = "device12345";

test.beforeEach(t => {
	client = new SimpleClient("node-gpodder", "node@123");
	advancedClient = new AdvancedClient("node-gpodder", "node@123");
});

test("FavoritesApi throws an error when accessed with SimpleClient", async t => {
	try {
		const favorites = await FavoritesApi.getFavorites(client);
		t.truthy(favorites);
	} catch (error) {
		t.truthy(error, "message");
		t.is(
			error.message,
			"The FavoritesApi cannot be accessed with the Simple API Client. It requires using the Advanced API Client."
		);
	}
});

test("FavoritesApi returns the list of favourite episodes", async t => {
	try {
		const favorites = await FavoritesApi.getFavorites(advancedClient);
		t.truthy(favorites);
	} catch (error) {
		t.falsy(error);
	}
});
