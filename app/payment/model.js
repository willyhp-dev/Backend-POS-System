const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const PaymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama Kelurahan Harus Diisi "],
    },
    email: {
      type: String,
      required: [true, "Email Tidak Boleh Kosong"],
      maxlength: [255, "Panjang email maksimal 255 karakter"],
    },
    namaRekening: {
      type: String,
      required: [true, "Nama Rekening Tidak Boleh Kosong"],
    },
    noRekening: {
      type: String,
      required: [true, "No Rekening Tidak Boleh Kosong"],
    },
  },

  { timestamps: true }
);
const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
