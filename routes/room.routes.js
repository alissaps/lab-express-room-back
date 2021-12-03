const express = require("express");

const router = express.Router();

const RoomModel = require("../models/Room.model");

router.post("/room", async (req, res) => {
    try {
      console.log(req.body);
        
      const result = await RoomModel.create(req.body);
        
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


  module.exports = router;