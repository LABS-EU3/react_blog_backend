var Pusher = require("pusher");

var pusher = new Pusher({
  appId: "939438",
  key: "ed02993fd520fcbcb423",
  secret: "52f7ae37bfb2b2ef39ff",
  cluster: "eu",
  encrypted: true
});

pusher.trigger("notifications-channel", "new-notification", {
  message: "hello world"
});
