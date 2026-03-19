'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orderItem", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "order",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      unit_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("orderItem");
  },
};