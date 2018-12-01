const path = require("path");
const test = require("ava");
const HOMEDIR = path.join(__dirname, "..", "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const TESTDIR = path.join(HOMEDIR, "test");
const SimpleClient = require(path.join(SRCDIR, "client", "simple-client"));
const SuggestionsApi = require(path.join(SRCDIR, "api")).SuggestionsApi;
let client = null;
let testDeviceId = "device12345";

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
