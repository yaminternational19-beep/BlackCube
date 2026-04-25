import { Router } from 'express';
import { listAdmins, createAdmin } from '../controllers/adminUserController.js';

const router = Router();

router.get('/', listAdmins);
router.post('/', createAdmin);

export default router;


