import { PortfolioItem } from '../models/PortfolioItem.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { ok, paginated } from '../utils/ApiResponse.js';

export const listPortfolio = asyncHandler(async (req, res) => {
  const page = parseInt((req.query.page) || '1', 10);
  const limit = parseInt((req.query.limit) || '10', 10);
  const q = (req.query.q) || '';
  const filter = q ? { title: { $regex: q, $options: 'i' } } : {};
  const [items, total] = await Promise.all([
    PortfolioItem.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    PortfolioItem.countDocuments(filter)
  ]);
  res.json(paginated(items, page, limit, total));
});

export const getPortfolio = asyncHandler(async (req, res) => {
  const item = await PortfolioItem.findById(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json(ok(item));
});

export const createPortfolio = asyncHandler(async (req, res) => {
  const item = await PortfolioItem.create(req.body);
  res.status(201).json(ok(item));
});

export const updatePortfolio = asyncHandler(async (req, res) => {
  const item = await PortfolioItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json(ok(item));
});

export const deletePortfolio = asyncHandler(async (req, res) => {
  const item = await PortfolioItem.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json(ok({ id: req.params.id }));
});


