const router = require("express").Router();
const { police_check } = require("../../middlewares");
const TagController = require("./controller");
router.get("/tag", police_check("read", "tag"), TagController.index);
router.get("/tag/:id", police_check("detail", "tag"), TagController.detail);
router.post("/tag/store", police_check("create", "tag"), TagController.store);
router.patch(
  "/tag/update/:id",
  police_check("update", "tag"),
  TagController.update
);
router.delete(
  "/tag/delete/:id",
  police_check("delete", "tag"),
  TagController.destroy
);

module.exports = router;
