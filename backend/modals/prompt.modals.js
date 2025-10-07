const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  promptText: {
    type: String,
    required: [true, 'Prompt text is required'],
    trim: true,
    maxlength: [5000, 'Prompt cannot exceed 5000 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['ChatGPT', 'Midjourney', 'DALL-E', 'Coding', 'Writing', 'Marketing', 'Other']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update 'updatedAt' on save
promptSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for like count
promptSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

module.exports = mongoose.model('Prompt', promptSchema);
