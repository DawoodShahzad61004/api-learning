import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'orders were fetched'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'order was created',
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