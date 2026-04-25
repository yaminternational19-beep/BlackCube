import { JobApplication } from '../models/JobApplication.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { ok, paginated } from '../utils/ApiResponse.js';

export const listJobApplications = asyncHandler(async (req, res) => {
  const page = parseInt((req.query.page) || '1', 10);
  const limit = parseInt((req.query.limit) || '10', 10);
  const q = (req.query.q) || '';
  const filter = q ? { name: { $regex: q, $options: 'i' } } : {};
  if (req.query.status) filter.status = req.query.status;
  const [items, total] = await Promise.all([
    JobApplication.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    JobApplication.countDocuments(filter)
  ]);
  res.json(paginated(items, page, limit, total));
});

export const getJobApplication = asyncHandler(async (req, res) => {
  const item = await JobApplication.findById(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json(ok(item));
});

export const createJobApplication = asyncHandler(async (req, res) => {
  const item = await JobApplication.create(req.body);
  res.status(201).json(ok(item));
});

export const updateJobApplication = asyncHandler(async (req, res) => {
  const item = await JobApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json(ok(item));
});

export const deleteJobApplication = asyncHandler(async (req, res) => {
  const item = await JobApplication.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json(ok({ id: req.params.id }));
});


