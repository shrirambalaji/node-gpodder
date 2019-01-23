const test = require("ava");

const SimpleClient = require("../../../src/client/simple-client");
const AdvancedClient = require("../../../src/client/advanced-client");
const { Favorites } = require("../../../src/api");

let client = null;
let advancedClient = null;

test.beforeEach(t => {
	client = new SimpleClient("node-gpodder", "node@123");
	advancedClient = new AdvancedClient("node-gpodder", "node@123");
});

test("FavoritesApi throws an error when accessed with SimpleClient", async t => {
	try {
		const favorites = await Favorites.getFavorites(client);
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
		const favorites = await Favorites.getFavorites(advancedClient);
		t.truthy(favorites);
	} catch (error) {
		t.falsy(error);
	}
});
