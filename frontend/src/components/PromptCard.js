import React, { useState } from 'react';
import { Copy, Star, Heart, Eye, Zap, Sparkles } from 'lucide-react';

const PromptCard = ({ prompt, onUpdate, onDelete, showActions = false }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.promptText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div 
      className="spline-prompt-card relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-semibold text-white mb-2 leading-tight">
            {prompt.title}
          </h3>
          <div className="flex items-center text-xs text-gray-400 space-x-2">
            <span>{prompt.author?.username || 'Anonymous'}</span>
            <span>•</span>
            <span>{new Date(prompt.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        {/* Category Badge */}
        <div className="spline-badge flex-shrink-0">
          <Zap className="w-3 h-3 mr-1" />
          {prompt.category}
        </div>
      </div>

      {/* Description */}
      {prompt.description && (
        <div className="mb-3">
          <p className="text-gray-400 text-sm">
            {truncateText(prompt.description, 80)}
          </p>
        </div>
      )}

      {/* Prompt Content */}
      <div className="spline-prompt-content mb-4">
        <p className="text-gray-300 text-sm leading-relaxed font-mono">
          {truncateText(prompt.promptText)}
        </p>
      </div>

      {/* Tags */}
      {prompt.tags && prompt.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {prompt.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="spline-tag">
              #{tag}
            </span>
          ))}
          {prompt.tags.length > 3 && (
            <span className="spline-tag opacity-60">
              +{prompt.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Stats & Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        {/* Stats */}
        <div className="flex items-center space-x-4 text-gray-400 text-sm">
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span>{prompt.likes?.length || 0}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{prompt.views || 0}</span>
          </div>
          {!prompt.isPublic && (
            <div className="flex items-center space-x-1 text-yellow-400">
              <span className="text-xs">🔒 Private</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="spline-action-btn"
            title="Copy prompt"
          >
            <Copy className="w-4 h-4" />
          </button>

          {/* Bookmark Button */}
          <button
            onClick={handleBookmark}
            className={`spline-action-btn ${isBookmarked ? 'bookmarked' : ''}`}
            title="Bookmark"
          >
            <Star className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Copy Success Notification */}
      {isCopied && (
        <div className="spline-notification">
          <Sparkles className="w-4 h-4 mr-2" />
          Copied to clipboard!
        </div>
      )}

      {/* Hover Glow Effect */}
      {isHovered && (
        <div className="spline-hover-glow"></div>
      )}
    </div>
  );
};

export default PromptCard;