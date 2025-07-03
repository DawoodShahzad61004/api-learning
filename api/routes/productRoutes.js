import express from "express";
import Product from "../models/product.js";
import mongoose from "mongoose";
import multer from "multer";
import CheckAuth from "../middleware/check-auth.js";
import ProductsController from "../controllers/productControllers.js";

const router = express.Router();
const PORT = process.env.PORT || 3000;
// If you want quick, temporary file access for further processing
// const upload = multer({
//   storage: multer.memoryStorage(),
// // Store files in memory for simplicity
//   limits: { fileSize: 1024 * 1024 * 5 },
// // Limit file size to 5MB
// });

// If you want to store files directly on your server
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
    // Specify the directory to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${new Date().toISOString().replace(/:/g, "-")}-${file.originalname}`
    );
    // Use a timestamp to avoid filename conflicts
  },
});
const uploads = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    // Check file type
    const fileTypes = /jpeg|jpg|png|gif/; // Allowed file types
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(
      file.originalname.split(".").pop().toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true); // Accept the file
    } else {
      cb(new Error("Only images are allowed!")); // Reject the file
    }
  },
});

router.get("/", ProductsController.getAllProducts);
router.post(
  "/",
  uploads.single("productImage"),
  CheckAuth,
  ProductsController.createProduct
);
router.get("/:productId", ProductsController.getProductById);
router.patch("/:productId", CheckAuth, ProductsController.updateProduct);
router.delete("/:productId", CheckAuth, ProductsController.deleteProduct);

export default router;
