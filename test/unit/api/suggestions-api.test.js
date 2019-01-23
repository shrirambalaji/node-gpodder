const test = require("ava");

const SimpleClient = require("../../../src/client/simple-client");
const { Suggestions: SuggestionsApi } = require("../../../src/api");

let client = null;

test.beforeEach(t => {
	client = new SimpleClient("node-gpodder", "node@123");
});

test("fetches the right suggestions", async t => {
	try {
		const suggestions = await SuggestionsApi.getSuggestions(client);
		t.truthy(suggestions);
	} catch (error) {
		t.falsy(error);
	}
});
