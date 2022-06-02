const { ObjectId } = require("mongodb");
const Category = require("./model");
const index = async (req, res) => {
  const { search = "" } = req.query;
  let criteria = {};
  if (search.length) {
    criteria = { ...criteria, name: { $regex: `${search}`, $options: "i" } };
  }
  let count = await Category.find().countDocuments();
  await Category.find(criteria)
    .then((result) => res.json({
      data: result,
      count:count,
    }))
    .catch((error) => res.send(error));
};
const detail = async (req, res) => {
  const id = req.params;
  await Category.findById({ _id: ObjectId(id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};
const store = async (req, res) => {
  const name = req.body;
  try {
    let categories = await Category.create(name);
    return res.json(categories);
  } catch (error) {
    return res.json(error);
  }
};
const update = async (req, res) => {
  const id = req.params;
  const name = req.body;
  try {
    let Categories = await Category.findByIdAndUpdate(
      { _id: ObjectId(id) },
      name,
      { run: true, runValidators: true }
    );
    return res.json(Categories);
  } catch (error) {
    return res.json(error);

  }
};
const destroy = async (req, res) => {
  const id = req.params;
  await Category.findByIdAndDelete({ _id: ObjectId(id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};
module.exports = {
  index,
  store,
  detail,
  update,
  destroy,
};
