const Payment = require("./model");
const { ObjectId } = require("mongodb");

const index = async (req, res, next) => {
  const { search = "" } = req.query;
  let criteria = {};
  if (search.length) {
    criteria = { ...criteria, name: { $regex: `${search}`, $options: "i" } };
  }
  let count = await Payment.find(criteria).countDocuments();
  await Payment.find(criteria)
    .then((result) =>
      res.json({
        data: result,
        count: count,
      })
    )
    .catch((error) => {
      res.json(error);
      next(error);
    });
  next();
};
const detail = async (req, res) => {
  const id = req.params.id;
  await Payment.find({ _id: ObjectId(id) })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
};
const store = async (req, res, next) => {
  const { name, email, noRekening, namaRekening } = req.body;
  await Payment.create({ name, email, noRekening, namaRekening })
    .then((result) => res.json(result))
    .catch((error) => {
      res.json(error);
      next(error);
    });
  next();
};
const update = async (req, res, next) => {
  const id = req.params.id;
  const update = req.body;
  await Payment.findByIdAndUpdate({ _id: ObjectId(id) }, { $set: update })
    .then((result) => res.json(result))
    .catch((error) => {
      res.json(error);
      next(error);
    });
  next();
};
const destroy = async (req, res, next) => {
  const id = req.params.id;
  await Payment.findByIdAndDelete({ _id: ObjectId(id) })
    .then((result) => res.json(result))
    .catch((error) => {
      res.json(error);
      next(error);
    });
  next();
};

module.exports = {
  index,
  store,
  update,
  destroy,
  detail,
};
