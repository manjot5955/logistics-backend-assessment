const { sequelize, Order, OrderItem, Product } = require("../models");
const { Op } = require("sequelize");

async function createOrder(userId, items) {
  const transaction = await sequelize.transaction();

  try {
    let totalAmount = 0;

    const order = await Order.create(
      {
        user_id: userId,
        order_number: "ORD-" + Date.now(),
        total_amount: 0,
      },
      { transaction },
    );

    for (const item of items) {
      const product = await Product.findByPk(item.product_id, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      await OrderItem.create(
        {
          order_id: order.id,
          product_id: product.id,
          quantity: item.quantity,
          unit_price: product.price,
        },
        { transaction },
      );

      product.stock -= item.quantity;
      await product.save({ transaction });
    }

    order.total_amount = totalAmount;
    await order.save({ transaction });

    await transaction.commit();

    return order;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function getUserOrders(userId, query) {
  const {
    status,
    from,
    to,
    page = 1,
    limit = 10,
    sort = "created_at",
    order = "DESC",
  } = query;

  const offset = (page - 1) * limit;

  const where = {
    user_id: userId,
  };

  if (status) {
    where.status = status;
  }

  if (from && to) {
    where.created_at = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  }

  const { rows, count } = await Order.findAndCountAll({
    where,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [[sort, order]],
    include: [
      {
        model: OrderItem,
        include: [
          {
            model: Product,
            attributes: ["id", "name", "sku", "price"],
          },
        ],
      },
    ],
  });

  const formattedOrders = rows.map((order) => ({
    ...order.toJSON(),
    total_items: order.OrderItems.length,
  }));

  return {
    total: count,
    page: parseInt(page),
    totalPages: Math.ceil(count / limit),
    orders: formattedOrders,
  };
}

async function cancelOrder(userId, orderId) {
  const transaction = await sequelize.transaction();

  try {
    const order = await Order.findOne({
      where: { id: orderId, user_id: userId },
      include: [OrderItem],
      transaction,
    });

    if (!order) {
      throw new Error("Order not found");
    }

    if (!["PENDING", "CONFIRMED"].includes(order.status)) {
      throw new Error("Order cannot be cancelled");
    }

    for (const item of order.OrderItems) {
      const product = await Product.findByPk(item.product_id, {
        transaction,
      });

      product.stock += item.quantity;
      await product.save({ transaction });
    }

    order.status = "CANCELLED";
    await order.save({ transaction });

    await transaction.commit();

    return order;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports = {
  createOrder,
  getUserOrders,
  cancelOrder
};
