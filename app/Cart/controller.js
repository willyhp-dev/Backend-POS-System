const Product = require("../Product/model");
const CardItems = require("../cart-items/model");
const { ObjectId } = require("mongodb");
const update = async (req, res) => {
  try {
    let cartitem = {};
    const items = req.body;
    await Product.find({ _id: items.id })
      .then((result) => {
        CardItems.deleteMany({ user: req.user._id });
        CardItems.bulkWrite(
          (cartitem = result.map((item) => {
            return {
              updateOne: {
                filter: {
                  user: req.user._id,
                  product: item._id,
                },

                update: {
                  $set: item,
                },
                upsert: true,
              },
            };
          }))
        );
        res.json(cartitem);
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    res.json(error);
  }
};
const index = async (req, res, next) => {
  let count = await CardItems.find({ user: req.user._id }).countDocuments();
  await CardItems.find({ user: req.user._id })
    .populate("product")
    .then((result) => {
      res.json({
        data: result,
        count:count
      });
    })
    .catch((error) => res.json(error));

  next();
};

const updateQty = async (req, res) => {
  try {
    const id = req.params.id;
    const { qty,subtotal } = req.body;
    let response = await CardItems.updateOne(
      { _id: ObjectId(id) },
      { $set: { qty: qty } }
    );
    return res.json(response);
  } catch (error) {
    res.json(error);
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    let response = await CardItems.findByIdAndDelete({ _id: ObjectId(id) });
    return res.json(response);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  update,
  index,
  destroy,
  updateQty,
};
