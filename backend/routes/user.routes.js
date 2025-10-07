const express = require('express');
const { 
  getUserProfile,
  updateProfile,
  toggleSavePrompt,
  getSavedPrompts
} = require('../controllers/user.controllers.js');
const { protect } = require('../middlewares/auth.middlewares.js');

const router = express.Router();

router.get('/:id', getUserProfile);
router.put('/profile', protect, updateProfile);
router.post('/save/:promptId', protect, toggleSavePrompt);
router.get('/saved', protect, getSavedPrompts);

module.exports = router;