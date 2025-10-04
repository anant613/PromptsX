import User from '../modals/user.modals.js';
import Prompt from '../modals/prompt.modals.js';

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    // Get user's prompts
    const prompts = await Prompt.find({ author: user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        user,
        prompts,
        promptCount: prompts.length
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { username, bio, profilePicture } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.profilePicture = profilePicture || user.profilePicture;

    const updatedUser = await user.save();

    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Save/Unsave prompt
// @route   POST /api/users/save/:promptId
// @access  Private
export const toggleSavePrompt = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const promptId = req.params.promptId;

    const index = user.savedPrompts.indexOf(promptId);

    if (index > -1) {
      // Prompt already saved, remove it
      user.savedPrompts.splice(index, 1);
    } else {
      // Save the prompt
      user.savedPrompts.push(promptId);
    }

    await user.save();

    res.json({
      success: true,
      data: {
        savedPrompts: user.savedPrompts,
        message: index > -1 ? 'Prompt removed from saved' : 'Prompt saved successfully'
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Get saved prompts
// @route   GET /api/users/saved
// @access  Private
export const getSavedPrompts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'savedPrompts',
      populate: { path: 'author', select: 'username profilePicture' }
    });

    res.json({
      success: true,
      data: user.savedPrompts
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};
