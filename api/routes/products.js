import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    const products = {
        name: res.body.name || 'Default Product',
        price: res.body.price || 0.0,
        description: res.body.description || 'No description provided'
    }
    res.status(200).json({
        message: 'Handling GET requests to /products',
        createdProduct: products
    });
});

router.post('/', (req, res) => {
    const products = {
        name: req.body.name || 'Default Product',
        price: req.body.price || 0.0,
        description: req.body.description || 'No description provided'
    }
    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: products
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