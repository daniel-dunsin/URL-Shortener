const { default: mongoose } = require("mongoose");

const URLSchema = new mongoose.Schema(
  {
    longURL: {
      type: String,
      required: true,
    },
    shortURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("URL", URLSchema);
