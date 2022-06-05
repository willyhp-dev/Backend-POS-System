const { ObjectId } = require("mongodb");
const path = require("path");
const fs = require("fs");
const Product = require("./model");
const config = require("../config");
const Category = require("../category/model");

const { findByIdAndUpdate, findById } = require("./model");
const Tag = require("../tag/model");

const index = async (req, res, next) => {
  const { skip = 0, limit = 30, q = "", category = "", tags = [] } = req.query;
  let criteria = {};
  try {
    if (q.length) {
      criteria = { ...criteria, name: { $regex: `${q}`, $options: "i" } };
    }
    if (category.length) {
      let categoryResult = await Category.findOne({
        name: { $regex: `${category}`, $options: "i" },
      });
      if (categoryResult) {
        criteria = { ...criteria, category: categoryResult._id };
      }
    }
    if (tags.length) {
      let tagsResult = await Tag.find({ name: { $in: tags } });
      if (tagsResult.length > 0) {
        criteria = {
          ...criteria,
          tags: { $in: tagsResult.map((tag) => tag._id) },
        };
      }
    }
    let count = await Product.find(criteria).countDocuments();
    let products = await Product.find(criteria)
      .skip(skip)
      .limit(limit)
      .populate("category")
      .populate("tag");
    return res.json({
      data: products,
      count: count,
    });
  } catch (err) {
    next(err);
  }
};
const detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Product.find({ _id: ObjectId(id) })
      .populate("category")
      .populate("tag")
      .then((result) => res.send(result))
      .catch((error) => console.log(error));
  } catch (err) {
    res.json({
      error: 1,
      message: err.message,
      fields: err.errors,
    });
  }
};
const store = async (req, res) => {
  const { name, price, description, category, tag } = req.body;
  const image = req.file;

  try {
    if (image) {
      let tmp_path = image.path;
      let originalExt =
        image.originalname.split(".")[image.originalname.split(".").length - 1];
      let filename = image.filename + "." + originalExt;

      let target_path = path.resolve(
        config.rootPath,
        `public/images/products/${filename}`
      );

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);
      src.pipe(dest);
      src.on("end", async () => {
        try {
          let product = await Product.create({
            name,
            price,
            description,
            category,
            tag,
            image_url: filename,
          });
          return res.send(product);
        } catch (err) {
          fs.unlinkSync(target_path);
          if (err && err.name === "ValidationError") {
            return res.json({
              error: 1,
              message: err.message,
              fields: err.errors,
            });
          }
        }
      });
      src.on("error"), () => {};
    } else {
      let product = new Product({
        name,
        description,
        price,
        category,
        tag,
      });
      product.save();
      return res.send(product);
    }
  } catch (err) {
    if (err && err.name === "ValidatationError") {
      res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
  }
};
const update = async (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file;
  const id = req.params.id;
  // let categori = "";
  // let tags = [];
  try {
    //   if (category) {
    //     await Category.find({ name: { $regex: category, $options: "i" } })
    //       .then((result) => {
    //         categori = result[0]._id;
    //       })
    //       .catch((error) => res.send(error));
    //   } else {
    //     delete category;
    //   }
    //   if (tag && tag.length > 0) {
    //     await Tag.find({ name: { $in: tag } })
    //       .then((result) => {
    //         tags.push(result.map((tagz) => tagz._id));
    //       })
    //       .catch((error) => res.send(error));
    //   } else {
    //     delete tag;
    //   }
    if (image) {
      let tmp_path = image.path;
      let originalExt =
        image.originalname.split(".")[image.originalname.split(".").length - 1];
      let filename = image.filename + "." + originalExt;
      let target_path = path.resolve(
        config.rootPath,
        `public/images/products/${filename}`
      );

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);
      src.pipe(dest);
      src.on("end", async () => {
        try {
          await Product.findByIdAndUpdate(
            { _id: ObjectId(id) },
            {
              $set: {
                name,
                price,
                description,
                // category: categori,
                // tag: tags,
                image_url: filename,
              },
            }
          )
            .then((result) => {
              let Currentimage = `${config.rootPath}/public/images/products/${result.image_url}`;
              if (fs.existsSync(Currentimage)) {
                fs.unlinkSync(Currentimage);
              }
              res.json(result);
            })
            .catch((error) => res.send(error));
        } catch (err) {
          fs.unlinkSync(target_path);
          if (err && err.name === "ValidationError") {
            return res.json({
              error: 1,
              message: err.message,
              fields: err.errors,
            });
          }
        }
      });
      src.on("error"), async () => {};
    } else {
      Product.findByIdAndUpdate(
        { _id: ObjectId(id) },
        {
          $set: {
            name,
            price,
            description,
            // category: categori,
            // tag: tags,
            // image_url: filename,
          },
        }
      )
        .then((result) => res.send(result))
        .catch((error) => res.send(error));
    }
  } catch (err) {
    if (err && err.name === "ValidatationError") {
      res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
  }
};

const destroy = async (req, res) => {
  const id = req.params.id;
  try {
    Product.findById({ _id: ObjectId(id) })
      .then((result) => {
        let Currentimage = `${config.rootPath}/public/images/products/${result.image_url}`;
        if (fs.existsSync(Currentimage)) {
          fs.unlinkSync(Currentimage);
        }
      })
      .catch((error) => res.send(error));
    let products = Product.findByIdAndDelete({ _id: ObjectId(id) });
    let Currentimage = products.image_url;
    if (fs.existsSync(Currentimage)) {
      fs.unlinkSync(Currentimage);
    }
    products
      .then((result) => res.send(result))
      .catch((error) => console.log(error));
  } catch (err) {
    res.json({
      error: 1,
      message: err.message,
      fields: err.errors,
    });
  }
};

const public = async (req, res) => {
  try {
    const id = req.params.id;
    let public = "Public";
    let response = await Product.updateOne(
      { _id: ObjectId(id) },
      { public: public }
    );
    return res.json(response);
  } catch (error) {
    res.json(error);
  }
};
const updateTag = async (req, res) => {
  try {
    const id = req.params.id;
    const { tag } = req.body;
    let tags = [];
    if (tag && tag.length > 0) {
      await Tag.find({ name: { $in: tag } })
        .then((result) => {
          if (result.length) {
            tags = result.map((tagz) => tagz._id);
          } else {
            delete tag;
          }
        })
        .catch((error) => res.send(error));
    }

    let response = await Product.updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          tag: tags,
        },
      }
    );
    return res.json(response);
  } catch (error) {
    return res.json(error);
  }
};
const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { category } = req.body;
    let categori = "";
    if (category) {
      await Category.find({ name: { $regex: category, $options: "i" } })
        .then((result) => {
          categori = result[0]._id;
        })
        .catch((error) => res.send(error));
    } else {
      delete category;
    }

    let response = await Product.updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          category: categori,
        },
      }
    );
    return res.json(response);
  } catch (error) {
    return res.json(error);
  }
};

module.exports = {
  index,
  store,
  detail,
  destroy,
  update,
  public,
  updateCategory,
  updateTag,
};
