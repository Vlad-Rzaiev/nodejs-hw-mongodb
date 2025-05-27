import { Router } from 'express';
import contactsRouter from '../routes/contacts.route.js';
import authRouter from '../routes/auth.route.js';

const router = Router();

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);

export default router;
