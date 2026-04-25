import { Service } from '../models/Service.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { ok, paginated } from '../utils/ApiResponse.js';

export const listServices = asyncHandler(async (req, res) => {
  const page = parseInt((req.query.page) || '1', 10);
  const limit = parseInt((req.query.limit) || '10', 10);
  const q = (req.query.q) || '';
  const filter = q ? { title: { $regex: q, $options: 'i' } } : {};
  const [items, total] = await Promise.all([
    Service.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Service.countDocuments(filter)
  ]);
  res.json(paginated(items, page, limit, total));
});

export const getService = asyncHandler(async (req, res) => {
  const item = await Service.findById(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json(ok(item));
});

export const createService = asyncHandler(async (req, res) => {
  const item = await Service.create(req.body);
  res.status(201).json(ok(item));
});

export const updateService = asyncHandler(async (req, res) => {
  const item = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json(ok(item));
});

export const deleteService = asyncHandler(async (req, res) => {
  const item = await Service.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json(ok({ id: req.params.id }));
});


