'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
  await queryInterface.createTable('products', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    sku: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    price: {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });
},

  async down(queryInterface) {
    await queryInterface.dropTable('products');
  }
};