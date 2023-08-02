import { Request, Response, NextFunction, Router } from 'express';
import { uploadMember, readMember } from '../../controllers/memberController';

const router = Router();

router.post('/member/signup', uploadMember);
router.get('/member/show', readMember);

export default router;