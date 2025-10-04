import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { promptAPI } from '../services/api';

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to create prompts
          </h2>
          <button
            onClick={() => setCurrentPage('login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {editPrompt ? 'Edit Prompt' : 'Create New Prompt'}
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a catchy title for your prompt"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Briefly describe what this prompt does"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prompt Text *
              </label>
              <textarea
                required
                value={formData.promptText}
                onChange={(e) => setFormData({ ...formData, promptText: e.target.value })}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono"
                placeholder="Enter your prompt here..."
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.promptText.length}/5000 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter tags separated by commas (e.g., creative, writing, marketing)"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublic"
                checked={formData.isPublic}
                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-900">
                Make this prompt public
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium disabled:opacity-50"
              >
                {loading ? 'Saving...' : (editPrompt ? 'Update Prompt' : 'Create Prompt')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditPrompt(null);
                  setCurrentPage('home');
                }}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
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