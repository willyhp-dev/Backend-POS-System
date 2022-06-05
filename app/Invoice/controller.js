const { subject } = require("@casl/ability");
const Invoice = require("../invoice/model");
const { policiesuser } = require("../../utils");

const show = async (req, res, next) => {
  try {
    let { order_id } = req.params;   
    let policy = policiesuser(req.user);
    let subjective = subject("Invoice", {
      ...invoice,
      user_id: invoice.user._id,
    });
    if (!policy.can("read", subjective)) {
      return res.json({
        error: 1,
        message: "anda tidak memiliki akses untuk melihat invoice ini",
      });
      }
      let invoice = await Invoice.findOne({ order: order_id })
      .populate("order")
      .populate("user");
    return res.json(invoice);
  } catch (error) {
    return res.json({
      error: 1,
      message: "error when getting invoice",
    });
  }
};
module.exports = { show };
