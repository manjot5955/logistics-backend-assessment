const productService = require("../services/product.service");

async function createProduct(req, res) {
  try {
    const product = await productService.createProduct(req.body);

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

async function getAllProducts(req, res, next) {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await productService.getAllProducts(page, limit);

    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res) {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json({ product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.body
    );

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    await productService.deleteProduct(req.params.id);

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct
};