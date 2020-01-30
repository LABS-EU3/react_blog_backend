const db = require("../dbConfig");

async function addNotification(notification) {
  //Ideally the notification object should look like this: {id, actorId, subjectId, type, content}
  try {
    const [id] = await db("notifications").insert(notification, "id");
    const response = await findNotificationById(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function updateNotification(id, notification) {
  try {
    await db("notifications")
      .where({ id: id })
      .update(notification);
    const response = await findNotificationById(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function findNotificationById(id) {
  try {
    const notification = await db("notifications")
      .where({ id: id })
      .first();
    return notification;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { addNotification, updateNotification };
