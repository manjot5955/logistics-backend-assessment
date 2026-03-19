const { Product } = require("../models");

function generateSKU(name) {
  return name.toUpperCase().replace(/\s+/g, "-") + "-" + Date.now();
}

async function createProduct(data) {
  const { name, price, stock } = data;

  if (!name || !price || stock == null) {
    throw new Error("All fields are required");
  }

  const product = await Product.create({
    name,
    sku: generateSKU(name),
    price,
    stock,
  });

  return product;
}

async function getAllProducts(page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const { rows, count } = await Product.findAndCountAll({
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [["created_at", "DESC"]],
  });

  return {
    total: count,
    page: parseInt(page),
    totalPages: Math.ceil(count / limit),
    products: rows,
  };
}

async function getProductById(id) {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}

async function updateProduct(id, data) {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("Product not found");
  }

  await product.update(data);

  return product;
}

async function deleteProduct(id) {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("Product not found");
  }

  await product.destroy();

  return true;
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};