// controllers/commentController.js
const Comment = require('../modals/comment.modals');
const Prompt = require('../modals/prompt.modals');

// @desc    Create comment
// @route   POST /api/comments/:promptId
// @access  Private
exports.createComment = async (req, res) => {
  try {
    const { commentText } = req.body;
    const promptId = req.params.promptId;

    // Check if prompt exists
    const prompt = await Prompt.findById(promptId);
    if (!prompt) {
      return res.status(404).json({ 
        message: 'Prompt not found' 
      });
    }

    const comment = await Comment.create({
      prompt: promptId,
      user: req.user.id,
      commentText
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('user', 'username profilePicture');

    res.status(201).json({
      success: true,
      data: populatedComment
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Get comments for a prompt
// @route   GET /api/comments/:promptId
// @access  Public
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ prompt: req.params.promptId })
      .populate('user', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: comments.length,
      data: comments
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ 
        message: 'Comment not found' 
      });
    }

    // Check ownership
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ 
        message: 'Not authorized to delete this comment' 
      });
    }

    await comment.deleteOne();

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};