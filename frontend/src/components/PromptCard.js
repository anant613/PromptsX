import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { promptAPI } from '../services/api';

const PromptCard = ({ prompt, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(
    user ? prompt.likes.some(like => like === user._id || like._id === user._id) : false
  );
  const [likeCount, setLikeCount] = useState(prompt.likes.length);
  const [showFullPrompt, setShowFullPrompt] = useState(false);

  const handleLike = async () => {
    if (!user) return;
    
    try {
      const response = await promptAPI.toggleLike(prompt._id);
      setIsLiked(response.data.data.isLiked);
      setLikeCount(response.data.data.likes);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      try {
        await promptAPI.delete(prompt._id);
        onDelete(prompt._id);
      } catch (error) {
        console.error('Error deleting prompt:', error);
      }
    }
  };

  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{prompt.title}</h3>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>By {prompt.author.username}</span>
            <span className="mx-2">•</span>
            <span>{new Date(prompt.createdAt).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{prompt.views} views</span>
          </div>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {prompt.category}
        </span>
      </div>

      {prompt.description && (
        <p className="text-gray-600 mb-3">{prompt.description}</p>
      )}

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <p className="text-gray-800 font-mono text-sm whitespace-pre-wrap">
          {showFullPrompt ? prompt.promptText : truncateText(prompt.promptText)}
        </p>
        {prompt.promptText.length > 200 && (
          <button
            onClick={() => setShowFullPrompt(!showFullPrompt)}
            className="text-blue-600 hover:text-blue-800 text-sm mt-2"
          >
            {showFullPrompt ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      {prompt.tags && prompt.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {prompt.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            disabled={!user}
            className={`flex items-center space-x-1 ${
              isLiked ? 'text-red-500' : 'text-gray-500'
            } hover:text-red-600 disabled:opacity-50`}
          >
            <span>{isLiked ? '❤️' : '🤍'}</span>
            <span>{likeCount}</span>
          </button>
        </div>

        {user && (user._id === prompt.author._id || user.id === prompt.author._id) && (
          <div className="flex space-x-2">
            <button
              onClick={() => onUpdate(prompt)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptCard;