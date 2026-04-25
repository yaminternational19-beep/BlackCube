import { Router } from 'express';
import { listPortfolio, getPortfolio, createPortfolio, updatePortfolio, deletePortfolio } from '../controllers/portfolioController.js';

const router = Router();

router.get('/', listPortfolio);
router.post('/', createPortfolio);
router.get('/:id', getPortfolio);
router.put('/:id', updatePortfolio);
router.delete('/:id', deletePortfolio);

export default router;


