const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI);

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

//import de mes routers
const characterRouter = require("./routes/character");
const comicRouter = require("./routes/comic");
const userRouter = require("./routes/user");

app.use(characterRouter);
app.use(comicRouter);
app.use(userRouter);

app.get("/", (req, res) => {
  try {
    return res.status(200).json({ message: "Bienvenue sur Marvel" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ error: "all routes" });
});

app.listen(process.env.PORT, () => {
  console.log("Server Started 💫");
});
