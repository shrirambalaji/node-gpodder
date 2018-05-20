const path = require("path");
const HOMEDIR = path.join(__dirname, "..", "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const test = require("ava");
const Locator = require(path.join(SRCDIR, "util", "locator.util"));
let locator = null;
test.before(t => {
	locator = new Locator("username");
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


test("locator.subscriptionsUri returns subscription Uri", t => {
	const uri = locator.subscriptionsUri("deviceId", "json");
	t.is(uri, "https://gpodder.net/subscriptions/username/deviceId.json");
});

test("locator.toplistUri returns subscription Uri", t => {
	const uri = locator.toplistUri(100, "json");
	t.is(uri, "https://gpodder.net/toplist/100.json");
});

test("locator.suggestionsUri returns subscription Uri", t => {
	const uri = locator.suggestionsUri(100, "json");
	t.is(uri, "https://gpodder.net/suggestions/100.json");
});

test("locator.searchUri returns search Uri", t => {
	const uri = locator.searchUri(":something?", "json");
	t.is(uri, "https://gpodder.net/search.json?q=%3Asomething%3F");
});

test("locator.addRemoveSubscriptionsUri returns subscription uri", t => {
	const uri = locator.addRemoveSubscriptionsUri("deviceId");
	t.is(uri, "https://gpodder.net/api/2/subscriptions/username/deviceId.json");
});

test("locator.subscriptionUpdatesUri returns subscription update uri", t => {
	const uri = locator.subscriptionUpdatesUri("deviceId", "1226");
	t.is(uri, "https://gpodder.net/api/2/subscriptions/username/deviceId.json?since=1226");
});

test("locator.uploadEpisodeActionsUri returns episode actions uri", t => {
	t.is(locator.uploadEpisodeActionsUri(), "https://gpodder.net/api/2/episodes/username.json");
});

test("locator.downloadEpisodeActionsUri returns valid download uri", t => {
	const downloadUri = locator.downloadEpisodeActionsUri("1337", "https://random.podcast.com", null);
	t.is(downloadUri, "https://gpodder.net/api/2/episodes/username.json?since=1337&podcast=https://random.podcast.com");
});

test("locator.downloadEpisodeActionsUri returns error when both podcast and deviceId are specified ", t => {
	const err = locator.downloadEpisodeActionsUri("1337", "https://random.podcast.com", "deviceId");
	t.is(err.message, "Must not specify both 'podcast' and 'deviceId'");
});

test("locator.deviceSettingsUri returns device settings uri", t => {
	t.is(locator.deviceSettingsUri("deviceId"), "https://gpodder.net/api/2/devices/username/deviceId.json");
});

test("locator.deviceListUri returns device settings uri", t => {
	t.is(locator.deviceListUri("deviceId"), "https://gpodder.net/api/2/devices/username.json");
});

test("locator.toptagsUri retuns top tags uri", t => {
	t.is(locator.toptagsUri(50), "https://gpodder.net/api/2/tags/50.json");
});

test("locator.podcastsOfATagUri returns podcasts of a particular tag uri", t => {
	t.is(locator.podcastsOfATagUri("hello", 100), "https://gpodder.net/api/2/tag/hello/100.json")
});

test("locator.podcastDataUri returns valid podcast data uri", t => {
	const podcastData = locator.podcastDataUri("https://random.podcast.com");
	t.is(podcastData, "https://gpodder.net/api/2/data/podcast.json?url=https://random.podcast.com");
});

test("locator.episodeDataUri returns valid episode data uri", t => {
	const episodeData = locator.episodeDataUri("https://random.podcast.com", "https://random.episode.com");
	t.is(episodeData, "https://gpodder.net/api/2/data/episode.json?podcast=https://random.podcast.com&url=https://random.episode.com");
});

test("locator.favoriteEpisodesUri returns favorite episodes uri", t => {
	t.is(locator.favoriteEpisodesUri(), "https://gpodder.net/api/2/favorites/username.json");
});

test("locator.settingsUri returns an error if an invalid type is specified", t => {
	const err = locator.settingsUri('wrong-type');
	t.is(err.message, 'Unsupported Setting Type');
})

test("locator.settingsUri returns a valid `account` setting uri", t => {
	const account = locator.settingsUri("account");
	t.is(account, "https://gpodder.net/api/2/settings/username/account.json");
});

test("locator.settingsUri returns a valid `device` setting uri", t => {
	const device = locator.settingsUri("device", "iphone");
	t.is(device, "https://gpodder.net/api/2/settings/username/device.json?device=iphone")
});

test("locator.settingsUri returns a error for `device` setting uri", t => {
	const err = locator.settingsUri("device", null);
	t.is(err.message, "Device Name is not specified");
});

test("locator.settingsUri returns a valid `podcast` setting uri", t => {
	const podcast = locator.settingsUri("podcast", "https://random.podcast.com");
	t.is(podcast, "https://gpodder.net/api/2/settings/username/podcast.json?podcast=https://random.podcast.com");
});

test("locator.settingsUri returns a error for `podcast` setting uri", t => {
	const err = locator.settingsUri("podcast", null);
	t.is(err.message, "Podcast Url is not specified");
});

test("locator.settingsUri returns a valid `episode` setting uri", t => {
	const episode = locator.settingsUri("episode", "https://random.podcast.com", "https://random.episode.com");
	t.is(episode, "https://gpodder.net/api/2/settings/username/episode.json?podcast=https://random.podcast.com&episode=https://random.episode.com");
});

test("locator.settingsUri returns a error for `episode` setting uri", t => {
	const err = locator.settingsUri("episode", null, "hello");
	t.is(err.message, "Podcast or Episode Url is not specified");
});

test("locator.rootUri fetches the root url of gpodder", t => {
	t.is(locator.rootUri(), "https://gpodder.net");
});
