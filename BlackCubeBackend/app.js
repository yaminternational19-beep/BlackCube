import express from 'express';
import cors from 'cors';
import path from 'path';
import apiRoutes from './src/routes/index.js';
import { errorHandler } from './src/middleware/errorHandler.js';

const app = express();

app.use(cors({ origin: "*", credentials: false }));
app.use(express.json({ limit: '2mb' }));

// Serve static files from uploads directory


app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Support direct requests to /pages by redirecting to the API mount at /api/pages (preserve method)
app.all('/pages', (_req, res) => res.redirect(307, '/api/pages'));
app.all('/pages/:path(*)', (req, res) => res.redirect(307, `/api/pages/${req.params.path}`));

// Support requests to /upload/* by forwarding to /api/upload/* (preserve method)
app.all('/upload/:path(*)', (req, res) => {
	const target = `/api/upload/${req.params.path}`;
	return res.redirect(307, target);
});

// Support requests to /portfolio/* by forwarding to /api/portfolio/* (preserve method)
app.all('/portfolio', (_req, res) => res.redirect(307, '/api/portfolio'));
app.all('/portfolio/:path(*)', (req, res) => res.redirect(307, `/api/portfolio/${req.params.path}`));

// Support requests to /careers/* by forwarding to /api/careers/* (preserve method)
app.all('/careers', (_req, res) => res.redirect(307, '/api/careers'));
app.all('/careers/:path(*)', (req, res) => res.redirect(307, `/api/careers/${req.params.path}`));


app.all('/contact-submissions', (_req, res) => res.redirect(307, '/api/contact-submissions'));
app.all('/contact-submissions/:path(*)', (req, res) => res.redirect(307, `/api/contact-submissions/${req.params.path}`));

// Support requests to /job-applications/* by forwarding to /api/job-applications/* (preserve method)
app.all('/job-applications', (_req, res) => res.redirect(307, '/api/job-applications'));
app.all('/job-applications/:path(*)', (req, res) => res.redirect(307, `/api/job-applications/${req.params.path}`));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api', apiRoutes);
app.use(errorHandler);
 
export default app;


