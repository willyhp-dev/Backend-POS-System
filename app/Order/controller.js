const CartItem = require("../cart-items/model");
const DeliveryAddress = require("../DeliveryAddress/model");
const { ObjectId } = require("mongodb");
const Order = require("./model");
const { Types } = require("mongoose");
const OrderItem = require("../order-items/model");
const { json } = require("express");

const store = async (req, res, next) => {
  try {
    let { delivery_fee, delivery_address,total } = req.body;
    let items = await CartItem.find({ user: req.user._id }).populate("product");
    if (!items) {
      return res.json({
        error: 1,
        message: "You are not create order because upu have not items in cart",
      });
    }
    let address = await DeliveryAddress.find({
      _id: Types.ObjectId(delivery_address),
    });
    // return res.json(address[0].kecamatan);
    let order = new Order({
      _id: new Types.ObjectId(),
      status: "waiting_payment",
      delivery_fee: delivery_fee,
      total:total,
      delivery_address: {
        provinsi: address[0].provinsi,
        kabupaten: address[0].kabupaten,
        kecamatan: address[0].kecamatan,
        kelurahan: address[0].kelurahan,
        detail: address[0].detail,
      },
      user: req.user._id,
    });

    let orderItems = await OrderItem.insertMany(
      items.map((item) => ({
        ...items,
        name: item.product.name,
        qty: item.qty,
        price: item.product.price,
        order: order._id,
        product: item.product._id,
      }))
    );
    orderItems.forEach((item) => order.order_items.push(item));
    order.save();
    await CartItem.deleteMany({ user: req.user._id });
    return res.json(order);
  } catch (error) {
    res.json({
      error: 1,
      message: error.message,
      fields: error.errors,
    });
    next(error);
  }
  next();
};

const index = async (req, res, next) => {
  try {
    const { search = "" } = req.query;
    let count = await Order.find({ user: req.user._id }).countDocuments();
    let orders = await Order.find({ user: req.user._id ,status: { $regex: `${search}`, $options: "i" }})
      .populate("order_items")
      .sort("-createdAt");
    return res.json({
      data: orders.map((order) => order.toJSON({ virtuals: true })),
      count,
    });
  } catch (error) {
    if (error && error.name == "ValidationError") {
      return res.json({
        error: 1,
        message: error.message,
        fields: error.errors,
      });
    }
    next(error);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    await Order.updateOne({ _id: ObjectId(id) }, { $set: { status: status } });
    return res.json(Order);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  store,
  index,
  update,
};
