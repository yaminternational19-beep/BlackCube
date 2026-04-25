import { Router } from 'express';
import { listBlogs, getBlog, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';

const router = Router();

router.get('/', listBlogs);
router.post('/', createBlog);
router.get('/:id', getBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;


