const path = require("path");
const test = require("ava");
const HOMEDIR = path.join(__dirname, "..", "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const TESTDIR = path.join(HOMEDIR, "test");
const SimpleClient = require(path.join(SRCDIR, "client", "simple-client"));
const AdvancedClient = require(path.join(SRCDIR, "client", "advanced-client"));
const DeviceApi = require(path.join(SRCDIR, "api")).DeviceApi;
let client = null;
let advancedClient = null;
let testDeviceId = "device12345";

test.beforeEach(t => {
	client = new SimpleClient("node-gpodder", "node@123");
	advancedClient = new AdvancedClient("node-gpodder", "node@123");
});

test("DeviceApi returns the list of devices", async t => {
	try {
		const devices = await DeviceApi.getDevices(advancedClient);
		t.truthy(devices);
	} catch (error) {
		t.falsy(error);
	}
});

test("DeviceApi returns updates to devices", async t => {
	try {
		const deviceUpdates = await DeviceApi.getDeviceUpdates(advancedClient, "device12345", 1337, true);
		t.truthy(deviceUpdates);
		t.truthy(deviceUpdates.add);
	} catch (error) {
		t.falsy(error);
	}
});

// FIXME: Gpodder issue while trying to re-update existing fields more than once.
test.skip("DeviceApi updates device Data", async t => {
	const body = {
		caption: `gpodder On Node-Gpodder -${Date.now()}`,
		type: "laptop"
	};
	try {
		const updated = await DeviceApi.updateDevices(advancedClient, "device12345", body);
	} catch (error) {
		t.falsy(error, "message");
	}
});
