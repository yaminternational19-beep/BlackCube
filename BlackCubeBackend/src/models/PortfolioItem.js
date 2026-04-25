import { Schema, model } from 'mongoose';

const PortfolioItemSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, default: '' },
  technologies: { type: [String], default: [] },
  client: { type: String, default: '' },
  link: { type: String, default: '' },
  image: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  coverImage: { type: String, default: '' },
  timeTaken: { type: String, default: '' },
  startDate: { type: String, default: '' },
  completedDate: { type: String, default: '' },
  methods: { type: [String], default: [] },
  team: [{ role: String, people: [String] }]
}, { timestamps: true });

export const PortfolioItem = model('PortfolioItem', PortfolioItemSchema);


