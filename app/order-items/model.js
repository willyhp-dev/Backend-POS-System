const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const OrderItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama Makanan Harus Diisi "],
      minlength: [3, "Panjang nama Makanan Minimal 50 karakter"],
    },
    price: {
      type: Number,
      required: [true, "Harga item Harus Diisi"],
    },
    qty: {
      type: Number,
      required: [true, "Kuantitas harus diisi"],
      min: [1, "kuantitas minimal 1"],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  { timestamps: true }
);
const OrderItem = mongoose.model("OrderItem", OrderItemSchema);
module.exports = OrderItem;
