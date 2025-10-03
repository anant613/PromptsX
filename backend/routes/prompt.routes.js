// routes/promptRoutes.js
const express = require('express');
const router = express.Router();
const { 
  createPrompt,
  getAllPrompts,
  getPrompt,
  updatePrompt,
  deletePrompt,
  toggleLike,
  getMyPrompts
} = require('../controllers/promptController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAllPrompts)
  .post(protect, createPrompt);

router.get('/my/prompts', protect, getMyPrompts);

router.route('/:id')
  .get(getPrompt)
  .put(protect, updatePrompt)
  .delete(protect, deletePrompt);

router.post('/:id/like', protect, toggleLike);

module.exports = router;
const express = require('express');
