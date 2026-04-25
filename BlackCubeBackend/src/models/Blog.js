import { Schema, model } from 'mongoose';

const BlogSchema = new Schema({
  title: { type: String, required: true },
  excerpt: { type: String, default: '' },
  image: { type: String, default: '' },
  category: { type: String, default: 'General' },
  author: { type: String, default: '' },
  date: { type: String, default: '' }
}, { timestamps: true });

export const Blog = model('Blog', BlogSchema);


