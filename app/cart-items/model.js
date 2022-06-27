const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const CartitemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name must be filled"],
      minlength: [5, "Panjang nama Makanan minimal 3 karakter"],
    },
    subtotal: {
      type: Number,
      default: 0,
    },
    qty: {
      type: Number,
      default:1
    },
    image_url: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);
const Category = mongoose.model("Cart", CartitemSchema);
module.exports = Category;
