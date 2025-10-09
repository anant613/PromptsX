import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { promptAPI } from '../services/api';
import { Sparkles, Tag, Type, FileText, Globe, Lock, Save, X } from 'lucide-react';

const CreatePrompt = ({ setCurrentPage, editPrompt, setEditPrompt }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: editPrompt?.title || '',
    promptText: editPrompt?.promptText || '',
    description: editPrompt?.description || '',
    category: editPrompt?.category || '',
    tags: editPrompt?.tags?.join(', ') || '',
    isPublic: editPrompt?.isPublic !== undefined ? editPrompt.isPublic : true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['ChatGPT', 'Midjourney', 'DALL-E', 'Coding', 'Writing', 'Marketing', 'Other'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const promptData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      if (editPrompt) {
        await promptAPI.update(editPrompt._id, promptData);
        setEditPrompt(null);
      } else {
        await promptAPI.create(promptData);
      }

      setFormData({
        title: '',
        promptText: '',
        description: '',
        category: '',
        tags: '',
        isPublic: true
      });
      
      setCurrentPage('home');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save prompt');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center create-prompt-container">
        <div className="text-center spline-card">
          <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">
            Neural Access Required
          </h2>
          <p className="text-gray-400 mb-6">Please log in to create prompts</p>
          <button
            onClick={() => setCurrentPage('login')}
            className="primary-button"
          >
            Access Neural Network
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="create-prompt-container">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="create-prompt-card p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gradient mb-4">
              {editPrompt ? 'Neural Prompt Editor' : 'Create Neural Prompt'}
            </h2>
            <p className="text-gray-400">
              Craft the perfect AI prompt for the community
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400/50 text-red-300 px-4 py-3 rounded-xl backdrop-blur-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="form-label flex items-center">
                <Type className="w-4 h-4 mr-2 text-purple-400" />
                Prompt Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-input w-full px-4 py-3"
                placeholder="Enter a catchy title for your prompt"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="form-label flex items-center">
                <Tag className="w-4 h-4 mr-2 text-blue-400" />
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="form-input w-full px-4 py-3"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="form-label flex items-center">
                <FileText className="w-4 h-4 mr-2 text-green-400" />
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="form-input w-full px-4 py-3 resize-none"
                placeholder="Briefly describe what this prompt does"
              />
            </div>

            {/* Prompt Text */}
            <div className="space-y-2">
              <label className="form-label flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-pink-400" />
                Prompt Text *
              </label>
              <div className="relative">
                <textarea
                  required
                  value={formData.promptText}
                  onChange={(e) => setFormData({ ...formData, promptText: e.target.value })}
                  rows={10}
                  className="form-input w-full px-4 py-3 font-mono text-sm resize-none"
                  placeholder="Enter your prompt here..."
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                  {formData.promptText.length}/5000
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="form-label flex items-center">
                <Tag className="w-4 h-4 mr-2 text-cyan-400" />
                Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="form-input w-full px-4 py-3"
                placeholder="creative, writing, marketing (comma separated)"
              />
            </div>

            {/* Public Toggle */}
            <div className="flex items-center space-x-3 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
              <input
                type="checkbox"
                id="isPublic"
                checked={formData.isPublic}
                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
              />
              <label htmlFor="isPublic" className="flex items-center text-white cursor-pointer">
                {formData.isPublic ? (
                  <Globe className="w-4 h-4 mr-2 text-green-400" />
                ) : (
                  <Lock className="w-4 h-4 mr-2 text-red-400" />
                )}
                {formData.isPublic ? 'Public prompt' : 'Private prompt'}
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="primary-button flex-1 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    {editPrompt ? 'Update Prompt' : 'Create Prompt'}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditPrompt(null);
                  setCurrentPage('home');
                }}
                className="secondary-button flex items-center justify-center"
              >
                <X className="w-5 h-5 mr-2" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePrompt;