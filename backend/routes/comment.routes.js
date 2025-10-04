import express from 'express';
import { 
  createComment,
  getComments,
  deleteComment
} from '../controllers/comments.controllers.js';
import { protect } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.route('/:promptId')
  .get(getComments)
  .post(protect, createComment);

router.delete('/:id', protect, deleteComment);

export default router;