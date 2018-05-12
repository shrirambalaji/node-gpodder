const path = require("path");
const HOMEDIR = path.join(__dirname, "..", "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const test = require("ava");
const locator = require(path.join(SRCDIR, "util", "locator.util"));

test("locator.getSubscriptionsUri fetches the right subscription Uri", t => {
	t.plan(1);
	const uri = locator.getSubscriptionsUri("username", "deviceId", "json");
	t.is(uri, "https://gpodder.net/subscriptions/username/deviceId.json");
});

test("locator.getSubscriptionsUri truncates extra dot, if present in format", t => {
	t.plan(1);
	const uri = locator.getSubscriptionsUri("username", "deviceId", ".json");
	t.is(uri, "https://gpodder.net/subscriptions/username/deviceId.json");
});
