const { police_check } = require("../../middlewares");

const router = require("express").Router();
const CardController = require("./controller");
router.patch(
  "/updates/carts",
  police_check("update", "Cart"),
  CardController.update
);
router.get("/carts", police_check("read", "Cart"), CardController.index);
router.delete(
  "/carts/delete/:id",
  police_check("delete", "Cart"),
  CardController.destroy
);

router.patch(
  "/carts/updateqty/:id",
  police_check("updateqty", "Cart"), CardController.updateQty
);

module.exports = router;
