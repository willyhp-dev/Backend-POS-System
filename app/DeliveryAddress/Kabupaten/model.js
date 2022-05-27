const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const KabupatenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama Kabupaten Harus Diisi "],
    },
  },
  { timestamps: true }
);
const Kabupaten = mongoose.model("Kabupaten", KabupatenSchema);
module.exports = Kabupaten;
