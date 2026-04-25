import { JobPosting } from '../models/JobPosting.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { ok, paginated } from '../utils/ApiResponse.js';

export const listJobs = asyncHandler(async (req, res) => {
  const page = parseInt((req.query.page ) || '1', 10);
  const limit = parseInt((req.query.limit ) || '10', 10);
  const q = (req.query.q ) || '';
  const filter = q ? { title: { $regex: q, $options: 'i' } } : {};
  const [items, total] = await Promise.all([
    JobPosting.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    JobPosting.countDocuments(filter)
  ]);
  res.json(paginated(items, page, limit, total));
});

export const getJob = asyncHandler(async (req, res) => {
  const item = await JobPosting.findById(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json(ok(item));
});

export const createJob = asyncHandler(async (req, res) => {
  const item = await JobPosting.create(req.body);
  res.status(201).json(ok(item));
});

export const updateJob = asyncHandler(async (req, res) => {
  const item = await JobPosting.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json(ok(item));
});

export const deleteJob = asyncHandler(async (req, res) => {
  const item = await JobPosting.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json(ok({ id: req.params.id }));
});


