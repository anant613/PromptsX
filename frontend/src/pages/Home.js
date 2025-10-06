import React, { useState, useEffect } from 'react';
import { promptAPI } from '../services/api';
import PromptCard from '../components/PromptCard';
import { Search, Filter, Zap, Sparkles, Brain, ArrowRight } from 'lucide-react';

const Home = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    sort: 'newest'
  });

  const categories = ['ChatGPT', 'Midjourney', 'DALL-E', 'Coding', 'Writing', 'Marketing', 'Other'];

  useEffect(() => {
    fetchPrompts();
  }, [filters]);

  const fetchPrompts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.search) params.search = filters.search;
      if (filters.sort !== 'newest') params.sort = filters.sort;

      const response = await promptAPI.getAll(params);
      setPrompts(response.data.data);
    } catch (error) {
      console.error('Error fetching prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePromptDelete = (promptId) => {
    setPrompts(prompts.filter(p => p._id !== promptId));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* 3D Spline-like Background */}
      <div className="absolute inset-0 spline-3d-bg">
        {/* Floating 3D Spheres */}
        <div className="sphere sphere-1"></div>
        <div className="sphere sphere-2"></div>
        <div className="sphere sphere-3"></div>
        <div className="sphere sphere-4"></div>
        
        {/* Curved Mesh Lines */}
        <svg className="mesh-lines" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="meshGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff0080" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#7928ca" stopOpacity="0.1"/>
            </linearGradient>
            <linearGradient id="meshGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#0070f3" stopOpacity="0.2"/>
            </linearGradient>
          </defs>
          
          {/* Curved Grid Lines */}
          <path className="mesh-line" d="M0,200 Q300,150 600,200 T1200,200" stroke="url(#meshGradient1)" strokeWidth="1" fill="none"/>
          <path className="mesh-line" d="M0,300 Q400,250 800,300 T1200,300" stroke="url(#meshGradient1)" strokeWidth="1" fill="none"/>
          <path className="mesh-line" d="M0,400 Q200,350 600,400 T1200,400" stroke="url(#meshGradient2)" strokeWidth="1" fill="none"/>
          <path className="mesh-line" d="M0,500 Q500,450 900,500 T1200,500" stroke="url(#meshGradient2)" strokeWidth="1" fill="none"/>
          
          {/* Vertical Curves */}
          <path className="mesh-line" d="M200,0 Q150,200 200,400 T200,800" stroke="url(#meshGradient1)" strokeWidth="1" fill="none"/>
          <path className="mesh-line" d="M400,0 Q350,300 400,600 T400,800" stroke="url(#meshGradient2)" strokeWidth="1" fill="none"/>
          <path className="mesh-line" d="M600,0 Q550,250 600,500 T600,800" stroke="url(#meshGradient1)" strokeWidth="1" fill="none"/>
          <path className="mesh-line" d="M800,0 Q750,350 800,700 T800,800" stroke="url(#meshGradient2)" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="mb-8">
              <h1 className="text-7xl font-black mb-6 spline-text">
                AI Prompt
                <span className="block text-gradient">Universe</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Discover, create, and share the most powerful AI prompts. 
                Join thousands of creators in the ultimate prompt ecosystem.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-6 mb-16">
              <button 
                className="spline-button primary"
                onClick={() => {
                  const promptsSection = document.querySelector('.prompts-section');
                  if (promptsSection) {
                    promptsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span>Explore Prompts</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button 
                className="spline-button secondary"
                onClick={() => window.open('https://gemini.google.com', '_blank')}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span>Try Gemini AI</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-sm text-gray-500">Prompts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">5K+</div>
                <div className="text-sm text-gray-500">Creators</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-sm text-gray-500">Downloads</div>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="spline-card mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Search className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">Find Your Perfect Prompt</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="spline-input-group">
                <input
                  type="text"
                  placeholder="Search prompts..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="spline-input"
                />
              </div>
              
              <div className="spline-input-group">
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="spline-input"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="spline-input-group">
                <select
                  value={filters.sort}
                  onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                  className="spline-input"
                >
                  <option value="newest">Latest</option>
                  <option value="popular">Popular</option>
                  <option value="liked">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Prompts Grid */}
          <div className="prompts-section">
          {loading ? (
            <div className="text-center py-20">
              <div className="spline-loader"></div>
              <p className="mt-6 text-gray-400">Loading prompts...</p>
            </div>
          ) : prompts.length === 0 ? (
            <div className="text-center py-20">
              <Brain className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No prompts found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prompts.map((prompt, index) => (
                <div 
                  key={prompt._id}
                  className="spline-card-animate"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PromptCard
                    prompt={prompt}
                    onDelete={handlePromptDelete}
                  />
                </div>
              ))}
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;