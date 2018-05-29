const path = require("path");
const test = require("ava");
const HOMEDIR = path.join(__dirname, "..", "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const SimpleClient = require(path.join(SRCDIR, "client", "simple-client"));
const PublicApi = require(path.join(SRCDIR, "api")).PublicApi;
const Podcast = require(path.join(SRCDIR, "models")).PodcastModel;
const mockTopList = require("../../fixtures/toplist.json");

test("toplist returns an array of podcasts", async t => {
	try {
		const toptags = await PublicApi.getTopList(10);
		t.is(Object.keys(toptags).length, 10);
		t.truthy(toptags[0].title);
		t.truthy(toptags[0].description);
		t.truthy(toptags[0].subscribers);
		t.truthy(toptags[0].subscribersLastWeek);
		t.truthy(toptags[0].logoUrl);
		t.truthy(toptags[0].website);
		t.truthy(toptags[0].mygpoLink);
	} catch (err) {
		t.falsy(err);
	}
});

test("searchPodcasts returns podcast results based on the input search query", async t => {
	try {
		const searchResults = await PublicApi.searchPodcasts("hello");
		t.truthy(searchResults);
	} catch (err) {
		t.falsy(err);
	}
});

test("searchPodcasts throws an error when input query is not provided", async t => {
	try {
		const searchResults = await PublicApi.searchPodcasts();
	} catch (err) {
		t.truthy(err);
		t.is(err.message, "Missing or invalid parameters: query");
	}
});

test("getPodcastsOfATag returns podcasts of specified tag", async t => {
	try {
		const podcasts = await PublicApi.getPodcastsOfATag("javascript", 20);
		t.truthy(podcasts);
		t.is(Object.keys(podcasts).length, 20);
	} catch (err) {
		t.falsy(err);
	}
});

test("getPodcastsOfATag throws an error when input tag is not provided", async t => {
	try {
		const podcasts = await PublicApi.getPodcastsOfATag();
	} catch (err) {
		t.truthy(err);
		t.is(err.message, "Missing or invalid parameters: tag");
	}
});

test("_toDataModel converts GET /toplist to a list of podcasts", async t => {
	try {
		const podcasts = await PublicApi._toDataModel(mockTopList.toplist, Podcast);
		t.pass();
	} catch (err) {}
});
