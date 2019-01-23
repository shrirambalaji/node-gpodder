const test = require("ava");
const SimpleClient = require("../../../src/client/simple-client");

test("client can be initialised", t => {
	t.plan(4);
	const sc = new SimpleClient("hello", "password", "somehost");
	t.is(sc.username, "hello");
	t.is(sc.password, "password");
	t.is(sc.host, "somehost");
	t.is(sc._hasCredentials(), true);
});
