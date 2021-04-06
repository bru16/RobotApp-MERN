import express from 'express'
import morgan from 'morgan'
import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import { createRoles } from './libs/initialSetup'
import userRoutes from './routes/user.routes'
import cors from 'cors'


const app = express();
createRoles();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello!');
})

app.use('/api/products', productsRoutes);    //toda ruta de productsRouters va a empezar con /products
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

export default app;