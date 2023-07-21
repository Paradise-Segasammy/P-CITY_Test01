import { Request, Response, NextFunction, Router } from 'express';
import { uploadRfidController, readRfidController } from '../../controllers/rfid/rfidController';

const router = Router();

router.post('/game_result', uploadRfidController);
router.get('/game_result', readRfidController);

export default router;