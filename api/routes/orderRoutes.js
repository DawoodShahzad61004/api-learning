import express from "express";
import CheckAuth from "../middleware/check-auth.js";
import {
  getAllOrders,
  createOrder,
  getOrderById,
  deleteOrder,
} from "../controllers/orderControllers.js";


const router = express.Router();
const PORT = process.env.PORT || 3000;

router.get("/", CheckAuth, getAllOrders);
router.post("/", CheckAuth, createOrder);
router.get("/:orderId", CheckAuth, getOrderById);
router.delete("/:orderId", CheckAuth, deleteOrder);

export default router;