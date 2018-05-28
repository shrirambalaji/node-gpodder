const path = require("path");
const test = require("ava");
const HOMEDIR = path.join(__dirname, "..", "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const SimpleClient = require(path.join(SRCDIR, "client", "simple-client"));
const { Subscriptions } = require(path.join(SRCDIR, "api"));

let client = null;
test.before(t => {
	client = new SimpleClient("shriram_balaji", "password", "host");
});

test("GET /subscriptions throws an Unauthenticated Error when credentials are wrong", async t => {
	let testDeviceId = "testDeviceId";
	try {
		const subs = await Subscriptions.get(client, testDeviceId, "json");
	} catch (e) {
		t.is(e.message, "Expected 2xx, found 401");
	}
});

test("GET /subscriptions throws an error when deviceId is null", async t => {
	try {
		const subs = await Subscriptions.get(client, null, "json");
	} catch (e) {
		t.is(e.message, "Missing or invalid parameters: deviceId");
	}
});

test("GET /subscriptions throws an error when subscription format is unsupported", async t => {
	try {
		const subs = await Subscriptions.get(client, "deviceid", "oops");
	} catch (e) {
		t.is(e.message, "Unsupported Subscription Format: oops");
	}
});
