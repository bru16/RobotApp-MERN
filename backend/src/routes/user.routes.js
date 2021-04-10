import { Router } from 'express'
const router = Router();
import * as userCtrl from '../controllers/user.controller'
import { authJwt } from '../middlewares';


router.get('/', [authJwt.verifyToken], userCtrl.getFavorite);

router.delete('/:robotId', [authJwt.verifyToken], userCtrl.deleteFavoriteRobot);

router.put('/:robotId', [authJwt.verifyToken], userCtrl.addFavoriteRobot);

export default router;