import { Router } from 'express';
import { listJobApplications, getJobApplication, createJobApplication, updateJobApplication, deleteJobApplication } from '../controllers/jobApplicationController.js';

const router = Router();

router.get('/', listJobApplications);
router.post('/', createJobApplication);
router.get('/:id', getJobApplication);
router.put('/:id', updateJobApplication);
router.delete('/:id', deleteJobApplication);

export default router;


