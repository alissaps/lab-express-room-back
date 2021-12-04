const express = require("express");

const router = express.Router();

const ReviewModel = require("../models/Reviews.model");

// Criar reviews para todos menos para o que ele criou
router.post("/reviews", async (req, res) => {
  try {
    console.log(req.body);

    const result = await ReviewModel.create(req.body);

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
