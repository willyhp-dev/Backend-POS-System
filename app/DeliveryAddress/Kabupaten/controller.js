const Kabupaten = require("./model");
const { ObjectId } = require("MongoDB");
const index = async (req, res) => {
  const {search =""} = req.query;
  let criteria = {};
  if (search.length) {
    criteria = { ...criteria, name: { $regex: `${search}`, $options: "i" } };
  }
  let count = await Kabupaten.find(criteria).countDocuments();
  await Kabupaten.find(criteria)
    .then((result) => res.json({
      data: result,
      count:count
    }))
    .catch((error) => res.json(error));
};
const detail = async (req, res) => {
  const id = req.params.id;
  await Kabupaten.find({ _id: ObjectId(id) })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
};
const store = async (req, res) => {
  const name = req.body;
  await Kabupaten.create(name)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
};
const update = async (req, res) => {
  const update = req.body;
  const id = req.params.id;
  await Kabupaten.findByIdAndUpdate({ _id: ObjectId(id) }, { $set: update })
    .then((result) => res.json(result))
    .catch((error) => req.json(error));
};
const destroy = async (req, res) => {
  const id = req.params.id;
  await Kabupaten.findByIdAndDelete({ _id: ObjectId(id) })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
};

module.exports = {
  index,
  detail,
  store,
  update,
  destroy,
};
