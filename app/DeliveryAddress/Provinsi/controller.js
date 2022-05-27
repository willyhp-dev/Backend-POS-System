const Provinsi = require("./model");
const { ObjectId } = require("MongoDb");

const index = async (req, res, next) => {
  const { search = "" } = req.query;
  const criteria = {};
  if (search.length) {
    criteria = { ...criteria, name: { $regex: `${search}`, $options: "i" } };
  }
  let count = await Provinsi.find(criteria).countDocuments();
  await Provinsi.find(criteria)
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
  await Provinsi.find({ _id: ObjectId(id) })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
};
const store = async (req, res, next) => {
  const store = req.body;
  await Provinsi.create(store)
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
  await Provinsi.findByIdAndUpdate({ _id: ObjectId(id) }, { $set: update })
    .then((result) => res.json(result))
    .catch((error) => {
      res.json(error);
      next(error);
    });
  next();
};
const destroy = async (req, res, next) => {
  const id = req.params.id;
  await Provinsi.findByIdAndDelete({ _id: ObjectId(id) })
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
