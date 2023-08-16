import { Request, Response, NextFunction, Router } from 'express';
import { uploadMember, readMember } from '../../controllers/memberController';
import { uploadReservation } from '../../controllers/reservationController';

const router = Router();

router.post('/member/signup', uploadMember);
router.get('/member/show', readMember);

router.post('/reservation/make', uploadReservation);
router.get('/reservation/show', readMember);

export default router;