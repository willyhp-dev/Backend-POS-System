const router = require("express").Router();
const { police_check } = require("../../middlewares");
const OrderController = require("./controller");

router.get("/orders", police_check("read", "Order"), OrderController.index);
router.post("/orders", police_check("create", "Order"), OrderController.store);

module.exports = router;
