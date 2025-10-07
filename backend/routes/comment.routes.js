const express = require('express');
const { 
  createComment,
  getComments,
  deleteComment
} = require('../controllers/comments.controllers.js');
const { protect } = require('../middlewares/auth.middlewares.js');

const router = express.Router();

router.route('/:promptId')
  .get(getComments)
  .post(protect, createComment);

router.delete('/:id', protect, deleteComment);

module.exports = router;