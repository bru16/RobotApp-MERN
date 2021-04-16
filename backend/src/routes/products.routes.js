import { Router } from 'express'
import * as productsCtrl from '../controllers/products.controller'
import { authJwt, upload, updateFavorites } from '../middlewares'

const router = Router();

router.get('/', [authJwt.verifyToken], productsCtrl.getProducts);

router.post('/new', [authJwt.verifyToken, authJwt.isAdmin, upload.array('file')], productsCtrl.createProduct);   //antes de crear el product Verifico mediante middlewares si 
//existe un token y si el user es moderator
router.get('/:productId', [authJwt.verifyToken], productsCtrl.getProductById);

router.put('/:productId', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.updateProductById);

router.delete('/:productId', [authJwt.verifyToken, authJwt.isModerator, updateFavorites], productsCtrl.deleteProductById);

export default router;