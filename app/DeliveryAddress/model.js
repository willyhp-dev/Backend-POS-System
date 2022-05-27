const mongoose = require("mongoose");

const DeliveryAddressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama alamat harus diisi "],
      maxlength: [255, "Panjang maksimal nama alamat adalah 255 karakter"],
    },
    kelurahan: {
      type: String,
      required: [true, "Kelurahan haris diisi "],
      maxlength: [255, "Panjang maksimal kelurahan adalah 255 karakter"],
    },
    kecamatan: {
      type: String,
      required: [true, "kecamatan harus diisi"],
      maxlength: [255, "Panjang maksimal kecamantan adalah 255"],
    },
    kabupaten: {
      type: String,
      required: [true, "kabupaten harus diisi"],
      maxlength: [255, "Panjang maksimal kabupaten adalah 255 karakter"],
    },
    provinsi: {
      type: String,
      required: [true, "Provinsi harus diisi"],
      maxlength: [255, "Panjang maksimal provinsi alamat adalah 255 karakter"],
    },
    detail: {
      type: String,
      required: [true, "Detail alamat harus diisi"],
      maxlength: [1000, "panjang maksimal detail alamat adalah 1000 karakter"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
const Tag = mongoose.model("DeliveryAddress", DeliveryAddressSchema);
module.exports = Tag;
