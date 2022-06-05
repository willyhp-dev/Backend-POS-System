const Kecamatan = require("./model");
const { ObjectId } = require("mongodb");

const index = async (req, res) => {
  const {search =""} = req.query;
  let criteria = {};
  if (search.length) {
    criteria = { ...criteria, name: { $regex: `${search}`, $options: "i" } };
    }
    let count = await Kecamatan.find(criteria).countDocuments();
  await Kecamatan.find(criteria)
      .then((result) => res.json({
          data: result,
          count:count
    }))
    .catch((error) => {
      res.json(error);
      
    });
};
const detail = async (req, res, next) => {
  const id = req.params.id;
  await Kecamatan.find({ _id: ObjectId(id) })
    .then((result) => res.json(result))
    .catch((error) => {
      res.json(error);
      next(error);
    });
  next();
};
const store = async (req, res, next) => {
  const store = req.body;
  await Kecamatan.create(store)
    .then((result) => res.json(result))
    .catch((error) => {
      res.json(error);
      next(error);
    });
  next();
};
const update = async (req, res, next) => {
  const id = req.params.id;
  const name = req.body;
  await Kecamatan.findByIdAndUpdate({ _id: ObjectId(id) }, { $set: name })
    .then((result) => res.json(result))
    .catch((error) => {
      res.json(error);
      next(error);
    });
  next();
};
const destroy = async (req, res, next) => {
  const id = req.params.id;
  await Kecamatan.findByIdAndDelete({ _id: ObjectId(id) })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
};
module.exports = {
  index,
  store,
  detail,
  update,
  destroy,
};
