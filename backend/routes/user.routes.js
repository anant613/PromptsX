// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getUserProfile, 
  updateProfile, 
  toggleSavePrompt, 
  getSavedPrompts 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/saved', protect, getSavedPrompts);
router.put('/profile', protect, updateProfile);
router.post('/save/:promptId', protect, toggleSavePrompt);
router.get('/:id', getUserProfile);

module.exports = router;
