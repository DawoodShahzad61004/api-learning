import express from "express";
import mongoose from "mongoose";
import Order from "../models/order.js";
import Product from "../models/product.js";

const router = express.Router();
const PORT = process.env.PORT || 3000;

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .select("id product quantity status orderDate")
      .populate("product", "name price") // Populates the 'product' field in each order with the corresponding Product document,
      .exec();                           // but selects only the 'name' and 'price' fields from the Product model

    const response = orders.map((order) => ({
      id: order.id,
      product: order.product,
      quantity: order.quantity,
      status: order.status,
      orderDate: order.orderDate,
      request: {
        type: "GET",
        description: "Get a specific order",
        url: `http://localhost:${PORT}/orders/${order.id}`,
      },
    }));

    res.status(200).json({
      count: orders.length,
      orders: response,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId).exec();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      product: productId,
      quantity: quantity || 1,
    });

    const result = await order.save();

    res.status(201).json({
      message: "Order created successfully",
      createdOrder: {
        id: result.id,
        product: result.product,
        quantity: result.quantity,
        status: result.status,
        orderDate: result.orderDate,
        request: {
          type: "GET",
          description: "Get the created order",
          url: `http://localhost:${PORT}/orders/${result.id}`,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:orderId", async (req, res) => {
  const id = req.params.orderId;

  try {
    const order = await Order.findById(id)
      .populate("product", "name price description")
      .exec();

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order found",
      order: {
        id: order.id,
        product: order.product,
        quantity: order.quantity,
        status: order.status,
        orderDate: order.orderDate,
        request: {
          type: "GET",
          description: "Get all orders",
          url: `http://localhost:${PORT}/orders`,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:orderId", async (req, res) => {
  const id = req.params.orderId;

  try {
    const result = await Order.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order deleted successfully",
      request: {
        type: "POST",
        description: "Create a new order",
        url: `http://localhost:${PORT}/orders`,
        body: { productId: "ID", quantity: "Number" },
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;