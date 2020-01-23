const express = require("express");

const service = require("../services/interests");

const { checkUserExistsById } = require("./utils/userExists");
const {authenticate} = require("./utils/loggedIn");

const router = express.Router();

router.post("/", authenticate, async (req, res, next) => {
    const interests = req.body;
    try {
        const userId = req.user.subject;
        interests.map((interest) => {
            service.addInterests({name: interest, userId})
        })
        return res.status(201).json({message: "Added successfully"});
    } catch (error){
        console.log(error)
        next(error);
    }
})

router.get("/", async (req, res, next) => {
  try {
    const response = await service.getInterests();
    res.status(200).json({ message: "Success", response });
    return response;
  } catch (error) {
    next(error);
  }
});

router.delete("/", checkUserExistsById, async (req, res) => {
  const { userId, name } = req.body;
  if (!userId || !name) {
    res
      .status(400)
      .json({ message: "Please provide userId and name in request body" });
  }
  try {
    const result = await service.removeInterest(userId, name);
    if (result) {
      res
        .status(200)
        .json({ message: "Successfully deleted", userId, interest: name });
    } else {
      res.status(400).json({ error: "Interest does not exist for this user" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
