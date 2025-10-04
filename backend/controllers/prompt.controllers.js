import Prompt from '../modals/prompt.modals.js';

// @desc    Create new prompt
// @route   POST /api/prompts
// @access  Private
export const createPrompt = async (req, res) => {
  try {
    const { title, promptText, description, category, tags } = req.body;

    const prompt = await Prompt.create({
      title,
      promptText,
      description,
      category,
      tags,
      author: req.user.id
    });

    const populatedPrompt = await Prompt.findById(prompt._id)
      .populate('author', 'username profilePicture');

    res.status(201).json({
      success: true,
      data: populatedPrompt
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Get all prompts (with filters)
// @route   GET /api/prompts
// @access  Public
export const getAllPrompts = async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let query = { isPublic: true };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Search in title, description, and tags
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Sort options
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'popular') {
      sortOption = { views: -1 };
    } else if (sort === 'liked') {
      sortOption = { likes: -1 };
    }

    const prompts = await Prompt.find(query)
      .populate('author', 'username profilePicture')
      .sort(sortOption)
      .limit(50);

    res.json({
      success: true,
      count: prompts.length,
      data: prompts
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Get single prompt
// @route   GET /api/prompts/:id
// @access  Public
export const getPrompt = async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id)
      .populate('author', 'username profilePicture bio')
      .populate('likes', 'username');

    if (!prompt) {
      return res.status(404).json({ 
        message: 'Prompt not found' 
      });
    }

    // Increment views
    prompt.views += 1;
    await prompt.save();

    res.json({
      success: true,
      data: prompt
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Update prompt
// @route   PUT /api/prompts/:id
// @access  Private
export const updatePrompt = async (req, res) => {
  try {
    let prompt = await Prompt.findById(req.params.id);

    if (!prompt) {
      return res.status(404).json({ 
        message: 'Prompt not found' 
      });
    }

    // Check ownership
    if (prompt.author.toString() !== req.user.id) {
      return res.status(403).json({ 
        message: 'Not authorized to update this prompt' 
      });
    }

    const { title, promptText, description, category, tags, isPublic } = req.body;

    prompt.title = title || prompt.title;
    prompt.promptText = promptText || prompt.promptText;
    prompt.description = description || prompt.description;
    prompt.category = category || prompt.category;
    prompt.tags = tags || prompt.tags;
    prompt.isPublic = isPublic !== undefined ? isPublic : prompt.isPublic;

    await prompt.save();

    res.json({
      success: true,
      data: prompt
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Delete prompt
// @route   DELETE /api/prompts/:id
// @access  Private
export const deletePrompt = async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);

    if (!prompt) {
      return res.status(404).json({ 
        message: 'Prompt not found' 
      });
    }

    // Check ownership
    if (prompt.author.toString() !== req.user.id) {
      return res.status(403).json({ 
        message: 'Not authorized to delete this prompt' 
      });
    }

    await prompt.deleteOne();

    res.json({
      success: true,
      message: 'Prompt deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Like/Unlike prompt
// @route   POST /api/prompts/:id/like
// @access  Private
export const toggleLike = async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);

    if (!prompt) {
      return res.status(404).json({ 
        message: 'Prompt not found' 
      });
    }

    const index = prompt.likes.indexOf(req.user.id);

    if (index > -1) {
      // Unlike
      prompt.likes.splice(index, 1);
    } else {
      // Like
      prompt.likes.push(req.user.id);
    }

    await prompt.save();

    res.json({
      success: true,
      data: {
        likes: prompt.likes.length,
        isLiked: index === -1
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Get user's own prompts
// @route   GET /api/prompts/my/prompts
// @access  Private
export const getMyPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find({ author: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: prompts.length,
      data: prompts
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};