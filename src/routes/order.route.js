const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");
const orderController = require("../controllers/order.controller");

router.get("/", 
    authenticate, 
    orderController.getOrders
);

router.post("/", 
    authenticate, 
    orderController.createOrder
);
router.post(
  "/:id/cancel",
  authenticate,
  orderController.cancelOrder
);

module.exports = router;
