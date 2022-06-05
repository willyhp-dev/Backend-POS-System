const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Invoice = require('../Invoice/model');


const OrderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["waiting_payment", "processing", "in delivery", "delivered"],
      default: "waiting_payment",
    },
    delivery_fee: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0
    },
    delivery_address: {
      provinsi: { type: String, required: [true, "provinsi Harus Diisi"] },
      kabupaten: { type: String, required: [true, "Kabupaten harus Diisi"] },
      kecamatan: { type: String, required: [true, "kecamatan harus diisi"] },
      kelurahan: { type: String, required: [true, "Kelurahan harus Diisi"] },
      detail: { type: String },
    },
    user: {
      type:Schema.Types.ObjectId,
      ref: "User",
    },
    order_items: [{ type: Schema.Types.ObjectId, ref: "OrderItem" }],
  },

  { timestamps: true }
);
OrderSchema.plugin( AutoIncrement, { inc_field: 'order_number' });
OrderSchema.virtual('items_count').get(function () {
    return this.order_items.reduce((total, item) => total += (item.price * item.qty), 0);
});
// OrderSchema.post('save', async function () {
//     let sub_total = this.order_items.reduce((total, item) => total += (item.price * item.qty), 0);
//     let invoice = new Invoice({
//         user: this.user,
//         order: this._id,
//         sub_total: sub_total,
//         delivery_fee: parsetInt(this.delivery_fee),
//         total: parseInt(sub_total + this.delivery_fee),
//         delivery_address: this.delivery_address
//     });
//     await invoice.save();
// });

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
