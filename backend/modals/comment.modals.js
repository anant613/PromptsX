// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  prompt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prompt',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  commentText: {
    type: String,
    required: [true, 'Comment text is required'],
    trim: true,
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', commentSchema);