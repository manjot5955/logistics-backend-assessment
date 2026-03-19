const orderService = require("../services/order.service");

async function createOrder(req, res) {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    const order = await orderService.createOrder(userId, items);

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getOrders(req, res, next) {
  try {
    const userId = req.user.id;

    const result = await orderService.getUserOrders(userId, req.query);

    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function cancelOrder(req, res, next) {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;

    const order = await orderService.cancelOrder(userId, orderId);

    res.json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createOrder, getOrders, cancelOrder };
