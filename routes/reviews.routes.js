const express = require("express");

const router = express.Router();

const ReviewModel = require("../models/Reviews.model");
const UserModel = require("../models/User.model");

const isAuthenticated = require("../middlewares/isAuthenticated");

// Criar reviews para todos menos para o que ele criou
router.post("/review", isAuthenticated, async (req, res) => {
  try {

    const user = await UserModel.findOne({ _id: req.user._id })
    .populate({
      path: "rooms",
      model: "Room",
    });

    user.rooms.map((currentRoom) => {
      if(currentRoom._id == req.body.roomId) {
        throw new Error("Você não pode criar review para o seu quarto")
      }
    })

    console.log(req.body);

    const result = await ReviewModel.create(req.body);

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
