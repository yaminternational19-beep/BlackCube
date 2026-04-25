import { Router } from 'express';
import { listJobs, getJob, createJob, updateJob, deleteJob } from '../controllers/careerController.js';

const router = Router();

router.get('/', listJobs);
router.post('/', createJob);
router.get('/:id', getJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;


