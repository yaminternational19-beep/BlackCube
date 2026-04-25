import { Router } from 'express';
import { listContactSubmissions, getContactSubmission, createContactSubmission, deleteContactSubmission } from '../controllers/contactSubmissionController.js';

const router = Router();

router.get('/', listContactSubmissions);
router.post('/', createContactSubmission);
router.get('/:id', getContactSubmission);
router.delete('/:id', deleteContactSubmission);

export default router;


