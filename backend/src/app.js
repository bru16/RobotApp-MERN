import express from 'express'
import morgan from 'morgan'
import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import { createRoles } from './libs/initialSetup'
import userRoutes from './routes/user.routes'
import testingRouter from './routes/test'
import cors from 'cors'
require('dotenv').config();

const app = express();
createRoles();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static('uploads')) //make directory public
app.use('/testUploads', express.static('testUploads'));

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

if (process.env.NODE_ENV === 'test') {
    console.log('TESTING...')
    app.use('/api/test', testingRouter);
}

export default app;