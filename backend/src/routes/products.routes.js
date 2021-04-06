import { Router } from 'express'
import * as productsCtrl from '../controllers/products.controller'
import { authJwt } from '../middlewares'
const router = Router();

router.get('/', [authJwt.verifyToken], productsCtrl.getProducts);

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.createProduct);   //antes de crear el product Verifico mediante middlewares si 
//existe un token y si el user es moderator
router.get('/:productId', [authJwt.verifyToken], productsCtrl.getProductById);

router.put('/:productId', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.updateProductById);

router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductById);

export default router;