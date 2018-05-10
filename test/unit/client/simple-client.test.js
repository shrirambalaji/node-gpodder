const path = require('path');
const HOMEDIR = path.join(__dirname, "..", "..", "..")
const SRCDIR = path.join(HOMEDIR, "src")
const test = require('ava');
const SimpleClient = require(path.join(SRCDIR, "client", "simple-client"))

test("client can be initialised", t => {
	const sc = new SimpleClient("hello", "hi", "somehost")
	t.is(sc.username, "hello");
});
