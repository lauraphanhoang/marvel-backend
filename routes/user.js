const express = require("express");

const router = express.Router();

const User = require("../models/User");

// pacakges de cryptage
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// POST pour créer un utilisateur
router.post("/user/signup", async (req, res) => {
  try {
    console.log(req.body);

    if (!req.body.username || !req.body.email || !req.body.password) {
      res.status(400).json({ message: "Missing parameters" });
    }

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      res.status(400).json({ message: "Your account alrealy exist" });
    }

    const salt = uid2(16);
    const token = uid2(64);

    const hash = SHA256(req.body.password + salt).toString(encBase64);

    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      token: token,
      hash: hash,
      salt: salt,
    });

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      token: newUser.token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email });
    if (!userFound) {
      res.status(400).json({ message: "wrong password or email" });
    }

    const newHash = SHA256(req.body.password + userFound.salt).toString(
      encBase64
    );
    if (userFound.hash !== newHash) {
      res.status(400).json({ message: "wrong password or email" });
    }

    return res.status(201).json({
      id: userFound._id,
      token: userFound.token,
      username: userFound.username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
