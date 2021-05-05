import User from '../models/User'
import Product from '../models/Product'
import { Router } from 'express'

const testingRouter = Router();

testingRouter.post('/reset', async (req, res) => {
    console.log('ENTERING')
    await Product.deleteMany({});
    await User.deleteMany({});
    res.status(204).end();
})

export default testingRouter;