const path = require("path");
const HOMEDIR = path.join(__dirname, "..", "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const test = require("ava");
const { error, success, debug } = require("util-box");
const SimpleClient = require(path.join(SRCDIR, "client", "simple-client"));
const subscriptionsApi = require(path.join(
  SRCDIR,
  "lib",
  "api",
  "subscriptions"
));
let client = null;
test.before(t => {
  client = new SimpleClient("shriram_balaji", "password", "host")
});

test("subscriptions Api rejects with error when unauthenticated", async t => {
  t.plan(1);
  let testDeviceId = "testDeviceId";
  let format = "json"
  try {
    const subscriptions = await(subscriptionsApi.get(client, testDeviceId, format));
    console.log(subscriptions);
  } catch (error) {
    console.log(error);
    t.truthy(error);
  }
});
