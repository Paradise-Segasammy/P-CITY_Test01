import { Router } from 'express';
import rfidRouter from './rfid/rfidRouter';

const router = Router();

//운영
router.use("/api", rfidRouter);

//개발
router.use("/dev")

export default router;