import { Router } from 'express';
import { listPages, getPage, createPage, updatePage, deletePage } from '../controllers/pageController.js';

const router = Router();

router.get('/', listPages);
router.post('/', createPage);
router.get('/:id', getPage);
router.put('/:id', updatePage);
router.delete('/:id', deletePage);

export default router;


