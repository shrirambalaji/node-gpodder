const test = require("ava");
const AdvancedClient = require("../../../src/client/advanced-client");
const { Device } = require("../../../src/api");

let advancedClient = null;

test.beforeEach(t => {
	advancedClient = new AdvancedClient("node-gpodder", "node@123");
});

test("DeviceApi returns the list of devices", async t => {
	try {
		const devices = await Device.getDevices(advancedClient);
		t.truthy(devices);
	} catch (error) {
		t.falsy(error);
	}
});

test("DeviceApi returns updates to devices", async t => {
	try {
		const deviceUpdates = await Device.getDeviceUpdates(advancedClient, "device12345", 1337, true);
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
		const updated = await Device.updateDevices(advancedClient, "device12345", body);
	} catch (error) {
		t.falsy(error, "message");
	}
});
