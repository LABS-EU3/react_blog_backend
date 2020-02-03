let Pusher = require("pusher");

let pusher = new Pusher({
  appId: "939438",
  key: "ed02993fd520fcbcb423",
  secret: "52f7ae37bfb2b2ef39ff",
  cluster: "eu",
  encrypted: true
});

module.exports = pusher;
