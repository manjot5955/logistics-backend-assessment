const sequelize = require("../config/database");
const User = require("./user.model");
const Product = require("./product.model");
const Order = require("./order.model");
const OrderItem = require("./orderItem.model");

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

module.exports = {
  sequelize,
  User,
  Product,
  Order,
  OrderItem
};