const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const authenticate = require("../middlewares/auth.middleware");
const { createProductValidator } = require("../validator/product.validator");
const validate = require("../middlewares/validate.middleware");
const authorize = require("../middlewares/role.middleware");

router.post(
  "/",
  authenticate,
  //   authorize("ADMIN"),
  createProductValidator,
  validate,
  productController.createProduct,
);

router.get("/:id", authenticate, productController.getProduct);
router.get("/", authenticate, productController.getAllProducts);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  productController.updateProduct,
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  productController.deleteProduct,
);

module.exports = router;
