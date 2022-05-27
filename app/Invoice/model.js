const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const InvoiceSchema = new mongoose.Schema(
  {
    sub_total: {
      type: Number,
      required: [true, "sub_total Harus diisi"],
    },
    delivery_fee: {
      type: Number,
      required: [true, "delivery_fee harus diisi"],
    },
    delivery_address: {
      provinsi: { type: String, required: [true, "provinsi harus diisi"] },
      kabupaten: { type: String, required: [true, "kabupaten harus disi."] },
      kecamatan: { type: String, required: [true, "kabupaten harus diisi "] },
      kelurahan: { type: String, required: [true, "keluarahan harus diisi"] },
    },
    total: {
      type: Number,
      required: [true, "total harus diisi"],
    },
    payment_status: {
      type: String,
      enum: ["waiting_payment", "paid"],
      default: "waiting_payment",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "order",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
