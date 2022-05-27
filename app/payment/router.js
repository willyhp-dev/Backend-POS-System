const router = require("express").Router();
const { police_check } = require("../../middlewares");
const PaymentController = require("./controller");

router.get(
  "/payment",
  police_check("read", "payment"),
  PaymentController.index
);
router.get(
  "/payment/detail/:id",
  police_check("detail", "payment"),
  PaymentController.detail
);
router.post(
  "/payment/store",
  police_check("create", "payment"),
  PaymentController.store
);
router.patch(
  "/payment/update/:id",
  police_check("update", "payment"),
  PaymentController.update
);
router.delete(
  "/payment/delete/:id",
  police_check("delete", "payment"),
  PaymentController.destroy
);

module.exports = router;
