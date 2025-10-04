import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { promptAPI } from '../services/api';
import PromptCard from '../components/PromptCard';

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

  const handlePromptDelete = (promptId) => {
    setPrompts(prompts.filter(p => p._id !== promptId));
  };

  const handlePromptUpdate = (prompt) => {
    setEditPrompt(prompt);
    setCurrentPage('create');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to view your prompts
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Prompts</h1>
            <p className="text-gray-600 mt-2">
              Manage and organize your created prompts
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('create')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
          >
            Create New Prompt
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading your prompts...</p>
          </div>
        ) : prompts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                No prompts yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't created any prompts yet. Start sharing your creative prompts with the community!
              </p>
              <button
                onClick={() => setCurrentPage('create')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
              >
                Create Your First Prompt
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                You have created {prompts.length} prompt{prompts.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prompts.map(prompt => (
                <PromptCard
                  key={prompt._id}
                  prompt={prompt}
                  onDelete={handlePromptDelete}
                  onUpdate={handlePromptUpdate}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPrompts;