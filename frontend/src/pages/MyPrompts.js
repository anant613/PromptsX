import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { promptAPI } from '../services/api';
import PromptCard from '../components/PromptCard';
import { Brain, Plus, Sparkles, Edit, Trash2 } from 'lucide-react';

const MyPrompts = ({ setCurrentPage, setEditPrompt }) => {
  const { user } = useAuth();
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMyPrompts();
    }
  }, [user]);

  const fetchMyPrompts = async () => {
    setLoading(true);
    try {
      const response = await promptAPI.getMyPrompts();
      setPrompts(response.data.data);
    } catch (error) {
      console.error('Error fetching my prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePromptDelete = async (promptId) => {
    try {
      await promptAPI.delete(promptId);
      setPrompts(prompts.filter(p => p._id !== promptId));
    } catch (error) {
      console.error('Error deleting prompt:', error);
    }
  };

  const handlePromptUpdate = (prompt) => {
    setEditPrompt(prompt);
    setCurrentPage('create');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center my-prompts-container">
        <div className="text-center spline-card">
          <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">
            Neural Access Required
          </h2>
          <p className="text-gray-400 mb-6">Please log in to view your prompts</p>
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
    <div className="my-prompts-container">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Neural Archive</h1>
            <p className="text-gray-400">
              Manage and organize your created prompts
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('create')}
            className="spline-button primary flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Prompt
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="spline-loader"></div>
            <p className="mt-6 text-gray-400">Loading your neural prompts...</p>
          </div>
        ) : prompts.length === 0 ? (
          <div className="text-center py-20">
            <div className="spline-card max-w-md mx-auto">
              <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                No Neural Prompts Yet
              </h3>
              <p className="text-gray-400 mb-8">
                You haven't created any prompts yet. Start sharing your creative prompts with the AI community!
              </p>
              <button
                onClick={() => setCurrentPage('create')}
                className="primary-button flex items-center mx-auto"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Prompt
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="spline-card mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Brain className="w-8 h-8 text-purple-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Your Neural Collection
                    </h3>
                    <p className="text-gray-400">
                      {prompts.length} prompt{prompts.length !== 1 ? 's' : ''} in your archive
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-400">
                    {prompts.reduce((total, prompt) => total + (prompt.likes?.length || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-500">Total Likes</div>
                </div>
              </div>
            </div>

            {/* Prompts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prompts.map((prompt, index) => (
                <div 
                  key={prompt._id}
                  className="spline-card-animate relative group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PromptCard
                    prompt={prompt}
                    onDelete={() => handlePromptDelete(prompt._id)}
                    onUpdate={() => handlePromptUpdate(prompt)}
                    showActions={true}
                  />
                  
                  {/* Action Buttons Overlay */}
                  <div className="prompt-actions absolute top-4 right-4">
                    <button
                      onClick={() => handlePromptUpdate(prompt)}
                      className="action-button edit-button mr-2"
                      title="Edit prompt"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this prompt?')) {
                          handlePromptDelete(prompt._id);
                        }
                      }}
                      className="action-button delete-button"
                      title="Delete prompt"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPrompts;