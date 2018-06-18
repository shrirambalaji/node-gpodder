const path = require("path");
const test = require("ava");
const HOMEDIR = path.join(__dirname, "..", "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const SimpleClient = require(path.join(SRCDIR, "client", "simple-client"));
const SubscriptionsApi = require(path.join(SRCDIR, "api")).SubscriptionsApi;
let client = null;

test.before(t => {
	client = new SimpleClient("test", "password");
});

test("GET /subscriptions throws an Unauthenticated Error when credentials are wrong", async t => {
	let testDeviceId = "testDeviceId";
	try {
		const subs = await SubscriptionsApi.get(client, testDeviceId, "json");
	} catch (e) {
		t.is(e.message, "Expected 2xx, found 400");
	}
});

test("GET /subscriptions throws an error when subscription format is unsupported", async t => {
	try {
		const subs = await SubscriptionsApi.get(client, "deviceid", "oops");
	} catch (e) {
		t.is(e.message, "Unsupported Subscription Format: oops");
	}
});

test("GET /subscriptions returns subscriptions", async t => {
	let testDeviceId = "123456";
	try {
		const subs = await SubscriptionsApi.get(new SimpleClient("node-gpodder", "node@123"), null, "json");
	} catch (e) {
		t.falsy(e);
	}
});
