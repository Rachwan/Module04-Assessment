import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../Controllers/productController.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/all", getAllProducts);
router.get("/:id", getProductById);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
