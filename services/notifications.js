const notifications = require("../data/models/notification-model");
let Pusher = require("pusher");

let pusher = new Pusher({
  appId: "939438",
  key: "ed02993fd520fcbcb423",
  secret: "52f7ae37bfb2b2ef39ff",
  cluster: "eu",
  encrypted: true
});

pusher.trigger("notifications-channel", "new-notification", {
  message: "hello world"
});

async function addNotification(notification) {
  try {
    const response = await notifications.addNotification(notification);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function updateNotification(id, notification) {
  try {
    const response = await notifications.updateNotification(id, notification);
    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { addNotification, updateNotification };
