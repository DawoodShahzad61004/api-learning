import express from 'express';
import productRoutes from './api/routes/products.js';
import orderRoutes from './api/routes/orders.js';

const app = express();
const PORT = 3000;

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

export default app;