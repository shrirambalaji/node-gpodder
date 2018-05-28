const path = require("path");
const test = require("ava");
const HOMEDIR = path.join(__dirname, "..", "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const SimpleClient = require(path.join(SRCDIR, "client", "simple-client"));
const { PublicApi } = require(path.join(SRCDIR, "api"));

let api = null;
test.before(t => {
	api = new PublicApi();
});

test("GET /toplist returns an array of podcasts", async t => {
	try {
		const toptags = await api.getTopList(10);
		t.is(toptags.length, 10);
		t.truthy(toptags[0].title);
		t.truthy(toptags[0].description);
		t.truthy(toptags[0].subscribers);
		t.truthy(toptags[0].subscribers_last_week);
		t.truthy(toptags[0].logo_url);
		t.truthy(toptags[0].scaled_logo_url);
		t.truthy(toptags[0].website);
		t.truthy(toptags[0].mygpo_link);
	} catch (err) {
		t.falsy(err);
	}
});

test("GET /search returns podcast results based on the input search query", async t => {
	try {
		const searchResults = await api.searchPodcasts("hello");
		t.truthy(searchResults);
	} catch (err) {
		t.falsy(err);
	}
});
