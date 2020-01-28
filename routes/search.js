const express = require("express");
const article_services = require('../services/articles');
const user_services = require('../services/users');
const router = express.Router();
const { } = article_services
const { } = user_services

router.post("/", async (req, res) => {
  const query = req.query.resources;
  try {
    const response = await service.addNewReaction(reaction);
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;
