const { police_check } = require("../../middlewares");

const router = require("express").Router();
const CardController = require("./controller");
router.patch("/updates/carts", police_check("update", "Cart"), CardController.update);
router.get("/carts", police_check("read", "Cart"), CardController.index);

module.exports = router;
