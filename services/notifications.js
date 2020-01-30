const notifications = require("../data/models/notification-model");

async function addNotification(notification) {
  try {
    const response = await notifications.addNotification(notification); ///{id, type, actorId, subjectId, isRead: false, content:""}
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getUserNotifications(userId) {
  try {
    const response = await notifications.getUserNotifications(userId);
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

module.exports = { addNotification, updateNotification, getUserNotifications };
