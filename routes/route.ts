import { Router } from 'express';
import hotelRouter from './dev/hotelRouter';

const router = Router();

//운영
//router.use("/api", rfidRouter);

//개발
router.use("/dev", hotelRouter)

export default router;