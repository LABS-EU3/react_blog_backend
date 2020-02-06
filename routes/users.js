const express = require("express");
const service = require("../services/users");
const { uploadFile } = require("../services/articles");
const {decode, authenticate} = require('./utils/loggedIn');
const formidable = require("formidable");
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
    res.status(response.statusCode).json(response.data);
  } catch (error) {
    next(error);
  }
})

router.post('/unsubscribe', async (req, res, next) => {
  try {
    const {email} = req.body;
    const response = await service.removeSubscription(email);
    res.status(response.statusCode).json(response.data);
  } catch (error) {
    next(error);
  }
})

router.get('/basic', async (req, res, next) => {
  try {
    const token = decode(req.headers.authorization);
    const user = await service.getBasic(token.subject);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
})

router.get("/:userId", authenticate, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await service.getUserInfo(userId);
    res.status(user.statusCode).json(user.data);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId", authenticate, async (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.parse(req, async function(err, fields, files) {
    let result = "";
    if (err) {
      console.error(err.message);
      return;
    }
    if (files.image) {
      result = await uploadFile(files.image);
    }
    try {
      let { userId } = req.params;
      let body = { ...fields };
      if(result) {
        body.avatarUrl = result
      }
      const response = await service.editUserInfo(body, userId);
      const newUserData = await service.getUserInfo(userId);
      res.status(response.statusCode).json(newUserData.data);
    } catch (error) {
      next(error);
    }
  });
})


module.exports = router;
