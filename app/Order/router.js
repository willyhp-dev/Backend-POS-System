const router = require("express").Router();
const { police_check } = require("../../middlewares");
const OrderController = require("./controller");

router.get("/orders", police_check("read", "Order"), OrderController.index);
router.post("/orders", police_check("create", "Order"), OrderController.store);
// router.get("/orders/detail/:id", police_check("detail", "Order"), OrderController.detail);
router.patch("/orders/update/:id", police_check("update", "Order"), OrderController.update);

module.exports = router;
