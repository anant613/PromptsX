// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const { 
  createComment, 
  getComments, 
  deleteComment 
} = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/:promptId')
  .get(getComments)
  .post(protect, createComment);

router.delete('/:id', protect, deleteComment);

module.exports = router;
