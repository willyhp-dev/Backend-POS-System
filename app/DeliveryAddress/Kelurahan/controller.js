const Kelurahan = require("./model");
const { ObjectId } = require("mongodb");

const index = async (req, res, next) => {
  const { search = "" } = req.query;
  let criteria = {};
  if (search.length) {
    criteria = { ...criteria, name: { $regex: `${search}`, $options: "i" } };
  }
  let count = await Kelurahan.find(criteria).countDocuments();
  await Kelurahan.find(criteria)
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
const detail = async (req, res, next) => {
  const id = req.params.id;
  await Kelurahan.find({ _id: ObjectId(id) })
    .then((result) => res.json(result))
    .catch((error) => {
      res.json(error);
      next(error);
    });
  next();
};
const store = async (req, res, next) => {
  const store = req.body;
  await Kelurahan.create(store)
    .then((result) => res.json(result))
    .catch((error) => {
      res.json(error);
      next(error);
    });
  next();
};
const update = async (req, res) => {
  const id = req.params.id;
  const name = req.body;
  await Kelurahan.findByIdAndUpdate({ _id: ObjectId(id) }, { $set: name })
    .then((result) => res.json(result))
    .catch((error) => {
      res.json(error);
    });
};
const destroy = async (req, res, next) => {
  const id = req.params.id;
  await Kelurahan.findByIdAndDelete({ _id: ObjectId(id) })
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
