const path = require("path");
const HOMEDIR = path.join(__dirname, "..", "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const test = require("ava");
const { error, success, debug } = require("util-box");
const subscriptionsApi = require(path.join(
  SRCDIR,
  "lib",
  "api",
  "subscriptions"
));

test("subscriptions Api rejects with error when unauthenticated", async t => {
  t.plan(1);
  let testUsername = "testUsername";
  let testDeviceId = "testDeviceId";
  let format = "json"
  try {
    const subscriptions = await(subscriptionsApi.get(testUsername, testDeviceId, format));
  } catch (error) {
    t.truthy(error);
  }
});
