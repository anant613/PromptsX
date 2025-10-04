import express from 'express';
import { 
  createPrompt,
  getAllPrompts,
  getPrompt,
  updatePrompt,
  deletePrompt,
  toggleLike,
  getMyPrompts
} from '../controllers/prompt.controllers.js';
import { protect } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.route('/')
  .get(getAllPrompts)
  .post(protect, createPrompt);

router.get('/my/prompts', protect, getMyPrompts);

router.route('/:id')
  .get(getPrompt)
  .put(protect, updatePrompt)
  .delete(protect, deletePrompt);

router.post('/:id/like', protect, toggleLike);

export default router;