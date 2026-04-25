import { Types } from 'mongoose';
import { Page } from '../models/Page.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { ok, paginated } from '../utils/ApiResponse.js';

export const listPages = asyncHandler(async (req, res) => {
  const page = parseInt((req.query.page) || '1', 10);
  const limit = parseInt((req.query.limit) || '10', 10);
  const q = (req.query.q) || '';
  const filter = q ? { title: { $regex: q, $options: 'i' } } : {};
  const [items, total] = await Promise.all([
    Page.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Page.countDocuments(filter)
  ]);
  res.json(paginated(items, page, limit, total));
});

export const getPage = asyncHandler(async (req, res) => {
  // Check if id is a valid ObjectId, if yes use findById, otherwise use findOne with id field
  let item = null;
  if (Types.ObjectId.isValid(req.params.id)) {
    item = await Page.findById(req.params.id);
  }
  if (!item) {
    item = await Page.findOne({ id: req.params.id });
  }
  if (!item) return res.status(404).json({ success: false, message: 'Page not found' });
  res.json(ok(item));
});

export const createPage = asyncHandler(async (req, res) => {
  const item = await Page.create(req.body);
  res.status(201).json(ok(item));
});

export const updatePage = asyncHandler(async (req, res) => {
  // Check if id is a valid ObjectId, if yes use _id, otherwise use id field
  let query;
  if (Types.ObjectId.isValid(req.params.id)) {
    const byId = await Page.findById(req.params.id);
    query = byId ? { _id: req.params.id } : { id: req.params.id };
  } else {
    query = { id: req.params.id };
  }
  // Upsert: create if doesn't exist, update if exists
  const item = await Page.findOneAndUpdate(
    query, 
    req.body, 
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  res.json(ok(item));
});

export const deletePage = asyncHandler(async (req, res) => {
  // Check if id is a valid ObjectId, if yes use _id, otherwise use id field
  let query;
  if (Types.ObjectId.isValid(req.params.id)) {
    const byId = await Page.findById(req.params.id);
    query = byId ? { _id: req.params.id } : { id: req.params.id };
  } else {
    query = { id: req.params.id };
  }
  const item = await Page.findOneAndDelete(query);
  if (!item) return res.status(404).json({ success: false, message: 'Page not found' });
  res.json(ok({ id: req.params.id }));
});


