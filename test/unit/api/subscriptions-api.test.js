const path = require("path");
const fileUtil = require("util-box").fileUtil;
const test = require("ava");
const HOMEDIR = path.join(__dirname, "..", "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const TESTDIR = path.join(HOMEDIR, "test");
const mockSubscriptions = require(path.join(
	TESTDIR,
	"fixtures",
	"subscriptions.json"
));
const SimpleClient = require(path.join(SRCDIR, "client", "simple-client"));
const SubscriptionsApi = require(path.join(SRCDIR, "api")).SubscriptionsApi;
let client = null;
let testDeviceId = "device12345";

test.beforeEach(t => {
	client = new SimpleClient("node-gpodder", "node@123");
});

test("getDeviceSubscriptions throws an Unauthenticated Error when credentials are wrong", async t => {
	let fakeClient = new SimpleClient("test", "password");
	let fakeDeviceId = "testDeviceId";
	try {
		const subs = await SubscriptionsApi.getDeviceSubscriptions(
			fakeClient,
			fakeDeviceId,
			"json"
		);
	} catch (e) {
		t.is(e.message, "Expected 2xx, found 401");
	}
});

test("getDeviceSubscriptions throws an error when subscription format is unsupported", async t => {
	try {
		const subs = await SubscriptionsApi.getDeviceSubscriptions(
			client,
			"deviceid",
			"oops"
		);
	} catch (e) {
		t.is(e.message, "Unsupported Subscription Format: oops");
	}
});

test("getDeviceSubscriptions returns subscriptions for the specified deviceId", async t => {
	let client = new SimpleClient("node-gpodder", "node@123");
	try {
		const subs = await SubscriptionsApi.getDeviceSubscriptions(
			client,
			testDeviceId,
			"json"
		);
		t.truthy(subs);
	} catch (e) {
		t.falsy(e);
	}
});

test("getAllSubscriptions returns all subscriptions for a user", async t => {
	try {
		const subs = await SubscriptionsApi.getAllSubscriptions(client, "json");
		t.truthy(subs);
	} catch (e) {
		t.falsy(e);
	}
});

test.skip("uploadDeviceSubscriptions returns the recent subscription changes", async t => {
	try {
		let testDeviceId = "device12345";
		// this doesnt seem to work, returns 400.
		const body = [
			"http://lugradio.org/episodes.rss",
			"http://feeds2.feedburner.com/LinuxOutlaws"
		];
		const subs = await SubscriptionsApi.uploadDeviceSubscriptions(
			client,
			testDeviceId,
			"json",
			body
		);
	} catch (e) {
		t.falsy(e);
	}
});

test("getSubscriptionChanges returns all subscription updates since the specified timestamp", async t => {
	try {
		let since = 12347;
		const subs = await SubscriptionsApi.getSubscriptionChanges(
			client,
			testDeviceId,
			since
		);
		t.truthy(subs);
		t.truthy(subs.add);
		t.truthy(subs.remove);
	} catch (e) {
		t.falsy(e);
	}
});
