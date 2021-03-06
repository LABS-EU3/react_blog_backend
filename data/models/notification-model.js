const db = require("../dbConfig");

async function addNotification(notification) {
  //Ideally the notification object should look like this: {id, actorId, subjectId, type, content}
  const type =
    notification.articleId === null ||
    typeof notification.articleId === "undefined"
      ? "follow"
      : "reaction";
  try {
    const [id] = await db("notifications").insert(notification, "id");
    const response = await findNotificationById(id, type);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function updateNotification(id) {
  try {
    const notification = await fetchNotificationToUpdate(id);
    const notificationToUpdate = {
      ...notification,
      isRead: !notification.isRead
    };
    await db("notifications")
      .where({ id: id })
      .update(notificationToUpdate);
    const response = await findNotificationById(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getUserNotifications(userId) {
  try {
    const response = await db("notifications")
      .select(
        "notifications.id",
        "notifications.type",
        "notifications.actorId",
        "notifications.content",
        "articles.title as articleTitle",
        "articles.custom_id as articleId",
        "users.fullname as actorName",
        "isRead"
      )
      .join("users", "users.id", "notifications.actorId")
      .join("articles", "articles.authorId", "notifications.subjectId")
      .where({ subjectId: userId })
      .andWhere({ isRead: false });
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function findNotificationById(id, type) {
  let notification;
  try {
    if (type === "reaction") {
      notification = await db("notifications")
        .select(
          "notifications.id",
          "notifications.type",
          "notifications.actorId",
          "notifications.content",
          "articles.title as articleTitle",
          "articles.custom_id as articleId",
          "users.fullname as actorName",
          "isRead"
        )
        .join("users", "users.id", "notifications.actorId")
        .join("articles", "articles.authorId", "notifications.subjectId")
        .where("notifications.id", id)
        .first();
      return notification;
    } else {
      notification = await db("notifications")
        .select(
          "notifications.id",
          "notifications.type",
          "notifications.actorId",
          "users.fullname as actorName",
          "isRead"
        )
        .join("users", "users.id", "notifications.actorId")
        .where("notifications.id", id)
        .first();
      return notification;
    }
  } catch (error) {
    console.log(error);
  }
}

async function fetchNotificationToUpdate(id) {
  try {
    const response = await db("notifications")
      .where({ id: id })
      .first();
    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addNotification,
  updateNotification,
  getUserNotifications,
  fetchNotificationToUpdate
};
