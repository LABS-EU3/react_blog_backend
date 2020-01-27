const express = require("express");
const service = require("../services/users");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await service.getUsers();
    res.status(users.statusCode).json(users.data);
  } catch (error) {
    next(error);
  }
});

router.post('/subscribe', async (req, res, next) => {
  try {
    const data = req.body;
    const response = await service.addSubscription(data);
    res.status(response.statusCode).json(response.message);
  } catch (error) {
    next(error);
  }
})

router.post('/unsubscribe', async (req, res, next) => {
  try {
    const {email} = req.body;
    const response = await service.removeSubscription(email);
    res.status(response.statusCode).json(response.message);
  } catch (error) {
    next(error);
  }
})

router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await service.getUserInfo(userId);
    res.status(result.statusCode).json(result.data);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { body } = req;
    const result = await service.editUserInfo(body, userId);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
