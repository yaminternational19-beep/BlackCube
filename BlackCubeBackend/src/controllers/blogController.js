import { Blog } from '../models/Blog.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { ok, paginated } from '../utils/ApiResponse.js';

export const listBlogs = asyncHandler(async (req, res) => {
  const page = parseInt((req.query.page) || '1', 10);
  const limit = parseInt((req.query.limit) || '10', 10);
  const q = (req.query.q) || '';
  const filter = q ? { title: { $regex: q, $options: 'i' } } : {};
  const [items, total] = await Promise.all([
    Blog.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Blog.countDocuments(filter)
  ]);
  res.json(paginated(items, page, limit, total));
});

export const getBlog = asyncHandler(async (req, res) => {
  const item = await Blog.findById(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json(ok(item));
});

export const createBlog = asyncHandler(async (req, res) => {
  const item = await Blog.create(req.body);
  res.status(201).json(ok(item));
});

export const updateBlog = asyncHandler(async (req, res) => {
  const item = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json(ok(item));
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const item = await Blog.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json(ok({ id: req.params.id }));
});


