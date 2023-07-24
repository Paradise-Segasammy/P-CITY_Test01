import { Request, Response, NextFunction, Router } from 'express';
import { hotelController } from '../../controllers/hotelController';

const router = Router();

router.post('/signup', hotelController);
//router.get('/game_result', readRfidController);

export default router;