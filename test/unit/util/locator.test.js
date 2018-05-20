const path = require("path");
const HOMEDIR = path.join(__dirname, "..", "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const test = require("ava");
const Locator = require(path.join(SRCDIR, "util", "locator.util"));
let locator = null;
test.before(t => {
	locator = new Locator("username");
});

test("locator.rootUri fetches the root url of gpodder", t => {
	t.is(locator.rootUri(), "https://gpodder.net");
});

test("locator._prefixString prefixes a string", t => {
	t.is(locator._prefixString(" world", "hello"), "helloworld");
});

test("locator._normalizeFormat returns an error when a invalid format is specified", t => {
	const err = locator._normalizeFormat("wrong-format");
	t.is(err.message, "Unsupported format");
});

test("locator._normalizeFormat truncates an extra dot if present in input format", t => {
	const format = locator._normalizeFormat(".json");
	t.is(format, "json");
});

test("locator._normalizeSince converts `since` into a number", t => {
	const since = locator._normalizeSince("1225");
	t.is(since, 1225);
	t.is(typeof since, "number");
});

test("locator._getBaseUri returns the base Uri of any specified endpoint", t => {
	t.is(locator._getBaseUri("subscriptions"), "https://gpodder.net/subscriptions");
	t.is(locator._getBaseUri("favorites"), "https://gpodder.net/favorites");
});

test("locator._getBaseUri return advanced api url", t => {
	t.is(locator._getBaseUri("subscriptions", true), "https://gpodder.net/api/2/subscriptions");
});


test("locator.subscriptionsUri returns the right subscription Uri", t => {
	const uri = locator.subscriptionsUri("deviceId", "json");
	t.is(uri, "https://gpodder.net/subscriptions/username/deviceId.json");
});

test("locator.toplistUri returns the right subscription Uri", t => {
	const uri = locator.toplistUri(100, "json");
	t.is(uri, "https://gpodder.net/toplist/100.json");
});

test("locator.suggestionsUri returns the right subscription Uri", t => {
	const uri = locator.suggestionsUri(100, "json");
	t.is(uri, "https://gpodder.net/suggestions/100.json");
});

test("locator.settingsUri returns an error if an invalid type is specified", t => {
	const err = locator.settingsUri('wrong-type');
	t.is(err.message, 'Unsupported Setting Type');
})

test("locator.settingsUri returns a valid `account` setting uri", t => {
	const account = locator.settingsUri("account");
	t.is(account, "https://gpodder.net/api/2/settings/username/account.json");
});

test("locator.downloadEpisodeActionsUri returns valid download uri", t => {
	const downloadUri = locator.downloadEpisodeActionsUri("1337", "https://random.podcast.com", null);
	t.is(downloadUri, "https://gpodder.net/api/2/episodes/username.json?since=1337&podcast=https://random.podcast.com");
});

test("locator.downloadEpisodeActionsUri returns error when both podcast and deviceId are specified ", t => {
	const err = locator.downloadEpisodeActionsUri("1337", "https://random.podcast.com", "deviceId");
	t.is(err.message, "Must not specify both 'podcast' and 'deviceId'");
});

test("locator.podcastDataUri returns valid podcast data uri", t => {
	const podcastData = locator.podcastDataUri("https://random.podcast.com");
	t.is(podcastData, "https://gpodder.net/api/2/data/podcast.json?url=https://random.podcast.com");
});
