import { ContactSubmission } from '../models/ContactSubmission.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { ok, paginated } from '../utils/ApiResponse.js';

export const listContactSubmissions = asyncHandler(async (req, res) => {
  const page = parseInt((req.query.page) || '1', 10);
  const limit = parseInt((req.query.limit) || '10', 10);
  const q = (req.query.q) || '';
  const filter = q ? { name: { $regex: q, $options: 'i' } } : {};
  const [items, total] = await Promise.all([
    ContactSubmission.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    ContactSubmission.countDocuments(filter)
  ]);
  res.json(paginated(items, page, limit, total));
});

export const getContactSubmission = asyncHandler(async (req, res) => {
  const item = await ContactSubmission.findById(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json(ok(item));
});

export const createContactSubmission = asyncHandler(async (req, res) => {
  const item = await ContactSubmission.create(req.body);
  res.status(201).json(ok(item));
});

export const deleteContactSubmission = asyncHandler(async (req, res) => {
  const item = await ContactSubmission.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json(ok({ id: req.params.id }));
});


