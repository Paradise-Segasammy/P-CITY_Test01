import { Router } from 'express';
import hotelRouter from './api/hotelRouter';

const router = Router();

//운영
//router.use("/api", rfidRouter);

//개발
router.use("/api", hotelRouter)

export default router;