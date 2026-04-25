import { Router } from 'express';
import blogRoutes from './blogRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import portfolioRoutes from './portfolioRoutes.js';
import pageRoutes from './pageRoutes.js';
import careerRoutes from './careerRoutes.js';
import jobApplicationRoutes from './jobApplicationRoutes.js';
import contactSubmissionRoutes from './contactSubmissionRoutes.js';
import uploadRoutes from './uploadRoutes.js';
import authRoutes from './authRoutes.js';
import adminUserRoutes from './adminUserRoutes.js';

const router = Router();

router.use('/blogs', blogRoutes);
router.use('/services', serviceRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/pages', pageRoutes);
router.use('/careers', careerRoutes);
router.use('/job-applications', jobApplicationRoutes);
router.use('/contact-submissions', contactSubmissionRoutes);
router.use('/upload', uploadRoutes);
router.use('/auth', authRoutes);
router.use('/admin-users', adminUserRoutes);

export default router;


