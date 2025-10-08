const User = require('../modals/user.modals.js');
const Prompt = require('../modals/prompt.modals.js');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

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

const updateProfile = async (req, res) => {
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

const toggleSavePrompt = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const promptId = req.params.promptId;

    const index = user.savedPrompts.indexOf(promptId);

    if (index > -1) {
      user.savedPrompts.splice(index, 1);
    } else {
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

const getSavedPrompts = async (req, res) => {
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

module.exports = {
  getUserProfile,
  updateProfile,
  toggleSavePrompt,
  getSavedPrompts
};