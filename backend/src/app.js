import express from 'express'
import morgan from 'morgan'
import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import { createRoles } from './libs/initialSetup'
import userRoutes from './routes/user.routes'
import cors from 'cors'
require('dotenv').config();

const app = express();
createRoles();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static('uploads')) //make directory public

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

export default app;