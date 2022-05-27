const DeliveryAddress = require("./model");
const { ObjectId } = require("mongodb");
const Product = require("../Product/model");
const { policiesuser } = require("../../utils");
const { subject } = require("@casl/ability");
const index = async (req, res, next) => {
  const { skip = 0, limit = 10 } = req.query;
  let count = await DeliveryAddress.find({ user: req.user._id }).countDocuments;
  await DeliveryAddress.find({ user: req.user._id })
    .skip(skip)
    .limit(limit)
    .sort("-createdAt")
    .then((result) =>
      res.json({
        data: result,
        count,
      })
    )
    .catch((error) => res.json(error));
};
const detail = async (req, res, next) => {
  const id = req.params.id;
  await DeliveryAddress.find({ _id: ObjectId(id) })
    .then((result) => res.json(result))
    .catch((error) => {
      res.json(error);
      next(error);
    });
};
const store = async (req, res, next) => {
  const { name, kelurahan, kecamatan, kabupaten, provinsi, detail } = req.body;
  let users = req.user;
 await DeliveryAddress.create({
    name,
    kelurahan,
    kecamatan,
    kabupaten,
    provinsi,
    detail,
    user: users._id,
  })
    .then((result) => res.json(result))
    .catch((error) => {
      res.json(error);
      next(error);
    });

};
const update = async (req, res, next) => {
  const { name, kelurahan, kecamatan, kabupaten, provinsi, detail } = req.body;
  const id = req.params.id;
  let address = await DeliveryAddress.findById({ _id: ObjectId(id) });
  let subjective = subject("address", { ...address, user_id: address.user });
  let policy = policiesuser(req.user);
  if (!policy.can("update", subjective)) {
    return res.json({
      error: 1,
      message: "You are not allowed to modifidy resource",
    });
  }

   await DeliveryAddress.findByIdAndUpdate(
    {
      _id: ObjectId(id),
    },
    {
      $set: {
        name,
        kelurahan,
        kecamatan,
        kabupaten,
        provinsi,
        detail,
      }
    }
  )
    .then((result) => res.json(result))
    .catch((error) => {
      res.json(error);
      next(error);
    });
  next()
};
const destroy = async (req, res, next) => {
  const id = req.params.id;
  let address = await DeliveryAddress.findById({ _id: ObjectId(id) });
  let subjective = subject("address", { ...address, user_id: address.user });
  let policy = policiesuser(req.user);
  if (!policy.can("delete", subjective)) {
    return res.json({
      error: 1,
      message: "You are not allowed to modifidy resource",
    });
  }
  await DeliveryAddress.findByIdAndDelete({ _id: ObjectId(id) })
    .then((result) => res.json(result))
    .catch((error) => {
      res.json(error);
      next(error);
    });
  next();
};

module.exports = {
  index,
  detail,
  store,
  update,
  destroy,
};
