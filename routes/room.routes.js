const express = require("express");

const router = express.Router();

const RoomModel = require("../models/Room.model");
 
// criar
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


  // listar

  router.get("/room", async (req, res) => {
    try {
      
      const rooms = await RoomModel.find();
  
      res.status(200).json(rooms);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // detalhe

  router.get("/room/:id", async (req, res) => {
    try {

      const room = await RoomModel.findOne({ _id: req.params.id });
  
      if (!product) {
        return res.status(404).json({ msg: "Produto não encontrado." });
      }
  
      res.status(200).json(room);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // update

  router.patch("/room/:id", async (req, res) => {
    try {

      const result = await RoomModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true, runValidators: true }
      );
  
      if (!result) {
        return res.status(404).json({ msg: "Produto não encontrado." });
      }
  
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  //delete

  router.delete("/room/:id", async (req, res) => {
    try {
      const result = await RoomModel.deleteOne({ _id: req.params.id });
  
      if (result.deletedCount < 1) {
        return res.status(404).json({ msg: "Produto não encontrado" });
      }

      res.status(200).json({});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  module.exports = router;