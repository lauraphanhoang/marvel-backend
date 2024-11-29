const mongoose = require("mongoose");

const Favori = mongoose.model("Favori", {
  body: Object,
  type: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favori;
