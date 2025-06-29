import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res) => {
    res.status(201).json({
        message: 'Handling POST requests to /products',
    });
});

router.get('/:productId', (req, res) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    }
    else {
        res.status(200).json({
            message: 'You passed an ID',
            id: id
        });
    }
});

router.patch('/:productId', (req, res) => {
    const id = req.params.productId;
    res.status(200).json({
        message: 'Updated product',
        id: id
    });
});

router.delete('/:productId', (req, res) => {
    const id = req.params.productId;
    res.status(200).json({  
        message: 'Deleted product',
        id: id
    }); 
});

export default router;