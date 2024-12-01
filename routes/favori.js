const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();
const Favori = require("../models/Favori");

router.post("/favoris", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;
    const itemType = req.body.name ? "character" : "comic";
    const itemInfos = req.body;

    const existingFavori = await Favori.findOne({
      user: userId,
      type: itemType,
      body: itemInfos,
    });

    if (existingFavori) {
      await Favori.findByIdAndDelete(existingFavori._id);
      res.status(200).json({ message: "Favori deleted" });
    } else {
      const newFavori = new Favori({
        body: itemInfos,
        type: itemType,
        user: userId,
      });

      await newFavori.save();

      res.status(201).json(newFavori);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/favoris", isAuthenticated, async (req, res) => {
  try {
    const favoris = await Favori.find({ user: req.user._id });

    res.status(200).json(favoris);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
