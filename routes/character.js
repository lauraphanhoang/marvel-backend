const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  try {
    // query : name, limit, skip
    let filters = "";
    if (req.query.name) {
      filters += `&name=${req.query.name}`;
    }
    if (req.query.limit) {
      filters += `&limit=${req.query.limit}`;
    }
    if (req.query.skip) {
      filters += `&skip=${req.query.skip}`;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}${filters}`
    );
    return res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
