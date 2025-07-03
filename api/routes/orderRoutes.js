import express from "express";
import CheckAuth from "../middleware/check-auth.js";
import OrdersController from "../controllers/ordersController.js";

const router = express.Router();
const PORT = process.env.PORT || 3000;

router.get("/", CheckAuth, OrdersController.getAllOrders);
router.post("/", CheckAuth, OrdersController.createOrder);
router.get("/:orderId", CheckAuth, OrdersController.getOrderById);
router.delete("/:orderId", CheckAuth, OrdersController.deleteOrder);

export default router;