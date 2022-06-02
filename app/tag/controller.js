const Tag = require("./model");
const { ObjectId } = require("mongodb");

const index = async (req, res) => {
  const { search = "" } = req.query;
  let criteria = {};
  if (search.length) {
    criteria ={...criteria, name:{$regex:search, $options:"i"}}
  }
  let count = await Tag.find().countDocuments();

  await Tag.find(criteria)
    .then((result) => res.json({
      data: result,
      count:count,
    }))
    .catch((error) => res.send(error));
};
const detail = async (req, res) => {
  const id = req.params;
  await Tag.find({ _id: ObjectId(id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};
const store = async (req, res) => {
  const name= req.body;
  try {
   let tags = await Tag.create( name );
   return res.json(tags);
 } catch (error) {
   return res.json(error);
 }
};
const update = async (req, res) => {
  const name = req.body;
  const id = req.params;
  try {
    let tags = await Tag.findByIdAndUpdate({ _id: ObjectId(id) }, name,{run:true, runValidators:true});
    return res.json(tags);
  } catch (error) {
    return res.json(error);
  }
};
const destroy = async (req, res) => {
  const id = req.params;
  try {
    let tags = await Tag.findByIdAndDelete({ _id: ObjectId(id) });
    return res.json(tags);
  } catch (error) {
    return res.json(error);
  }
};
module.exports = {
  index,
  store,
  destroy,
  update,
  detail,
};
