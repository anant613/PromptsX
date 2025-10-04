import express from 'express';
import { 
  getUserProfile,
  updateProfile,
  toggleSavePrompt,
  getSavedPrompts
} from '../controllers/user.controllers.js';
import { protect } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.get('/:id', getUserProfile);
router.put('/profile', protect, updateProfile);
router.post('/save/:promptId', protect, toggleSavePrompt);
router.get('/saved', protect, getSavedPrompts);

export default router;