const express = require('express');
const { 
  createPrompt,
  getAllPrompts,
  getPrompt,
  updatePrompt,
  deletePrompt,
  toggleLike,
  getMyPrompts
} = require('../controllers/prompt.controllers.js');
const { protect } = require('../middlewares/auth.middlewares.js');

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

module.exports = router;