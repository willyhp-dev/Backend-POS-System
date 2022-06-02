const router = require("express").Router();
const multer = require("multer");
const os = require("os");
const ProductController = require("./controller");
const { police_check } = require("../../middlewares");
router.get(
  "/products?:search",
  police_check("read", "product"),
  ProductController.index
);
router.get(
  "/products/:id",
  police_check("detail", "product"),
  ProductController.detail
);
router.post(
  "/products/store",
  multer({ dest: os.tmpdir() }).single("image"),
  police_check("create", "product"),
  ProductController.store
);
router.patch(
  "/products/update/:id",
  police_check("update", "product"),
  multer({ dest: os.tmpdir() }).single("image"),
  ProductController.update
);
router.patch(
  "/products/public/:id",
  police_check("public", "product"),
  ProductController.public
);
router.patch(
  "/products/category/:id",
  police_check("updateCategory", "product"),
  ProductController.updateCategory
);
router.patch("/products/tag/:id",police_check("updateTag","product"),ProductController.updateTag)

router.delete(
  "/products/delete/:id",
  police_check("delete", "product"),
  multer({ dest: os.tmpdir() }).single("image"),
  ProductController.destroy
);

module.exports = router;
