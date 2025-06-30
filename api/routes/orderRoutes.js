import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    const orders = {
        orderId: req.body.orderId || 'Default Order ID',
        product: req.body.product || 'Default Product',
        quantity: req.body.quantity || 1
    };
    res.status(200).json({
        message: 'orders were fetched',
        orders: orders
    });
});

router.post('/', (req, res, next) => {
    const orders = {
        orderId: req.body.orderId || 'Default Order ID',
        product: req.body.product || 'Default Product',
        quantity: req.body.quantity || 1
    };
    res.status(201).json({
        message: 'order was created',
        orders: orders
    });
});

router.get('/:orderId', (req, res) => {
    const id = req.params.orderId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special order ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an order ID',
            id: id
        });
    }
});

router.delete('/:orderId', (req, res) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: 'order deleted',
        id: id
    });
});

export default router;