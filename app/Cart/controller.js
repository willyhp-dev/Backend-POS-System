const Product = require("../Product/model");
const CardItems = require("../cart-items/model");
const update = async (req, res) => {
  try {
    let cartitem = {};
    const items = req.body;
    await Product.find({ _id: items._id })
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

    return res.json(cartitem);
  } catch (error) {
    return res.json(error);
  }
};
const index = async (req, res, next) => {
  await CardItems.find({ user: req.user._id })
    .populate("product")
    .then((result) => res.json(result))
    .catch((error) => res.json(error));

  next();
};
module.exports = {
  update,
  index,
};
