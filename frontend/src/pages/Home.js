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
    <div style={{minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden'}}>
      {/* Flowing Background Shapes */}
      <div className="flowing-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
        <div className="shape shape-6"></div>
      </div>
      
      {/* Content */}
      <div style={{position: 'relative', zIndex: 2, padding: '2rem'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          
          {/* Hero Section */}
          <div style={{textAlign: 'center', marginBottom: '4rem', paddingTop: '2rem'}}>
            <h1 style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: '700',
              lineHeight: '0.9',
              marginBottom: '2rem',
              color: 'white'
            }}>
              AI Prompt
              <br />
              <span style={{background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Universe</span>
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '600px',
              margin: '0 auto 3rem',
              lineHeight: '1.6'
            }}>
              Discover, create, and share the most powerful AI prompts. 
              Join thousands of creators in the ultimate prompt ecosystem.
            </p>
            

            
            {/* CTA Buttons */}
            <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap'}}>
              <button 
                className="btn-primary"
                onClick={() => {
                  const promptsSection = document.querySelector('.prompts-section');
                  if (promptsSection) {
                    promptsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <ArrowRight size={20} />
                Explore Prompts
              </button>
              <button 
                className="btn-secondary"
                onClick={() => window.open('https://gemini.google.com', '_blank')}
              >
                <Sparkles size={20} />
                Try Demo
              </button>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="modern-card" style={{marginBottom: '3rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem'}}>
              <Search size={24} style={{color: '#ff6b35'}} />
              <h3 style={{fontSize: '1.5rem', fontWeight: '600', margin: 0, color: 'white'}}>Find Your Perfect Prompt</h3>
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
              <div style={{position: 'relative'}}>
                <input
                  type="text"
                  placeholder="Search prompts..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 107, 53, 0.3)',
                    borderRadius: '12px',
                    padding: '1rem',
                    color: 'white',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 107, 53, 0.3)'}
                />
              </div>
              
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 107, 53, 0.3)',
                  borderRadius: '12px',
                  padding: '1rem',
                  color: 'white',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer'
                }}
                onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 107, 53, 0.3)'}
              >
                <option value="" style={{background: '#1a1a1a', color: 'white'}}>All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category} style={{background: '#1a1a1a', color: 'white'}}>{category}</option>
                ))}
              </select>
              
              <select
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 107, 53, 0.3)',
                  borderRadius: '12px',
                  padding: '1rem',
                  color: 'white',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer'
                }}
                onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 107, 53, 0.3)'}
              >
                <option value="newest" style={{background: '#1a1a1a', color: 'white'}}>Latest</option>
                <option value="popular" style={{background: '#1a1a1a', color: 'white'}}>Popular</option>
                <option value="liked" style={{background: '#1a1a1a', color: 'white'}}>Top Rated</option>
              </select>
            </div>
          </div>

          {/* Prompts Grid */}
          <div className="prompts-section">
            {loading ? (
              <div style={{textAlign: 'center', padding: '4rem 0'}}>
                <div className="loading-spinner"></div>
                <p style={{marginTop: '1rem', color: 'rgba(255,255,255,0.7)'}}>Loading prompts...</p>
              </div>
            ) : prompts.length === 0 ? (
              <div style={{textAlign: 'center', padding: '4rem 0'}}>
                <Brain size={64} style={{color: 'rgba(255,255,255,0.3)', margin: '0 auto 1rem'}} />
                <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '1.125rem'}}>No prompts found</p>
              </div>
            ) : (
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
                {prompts.map((prompt, index) => (
                  <div 
                    key={prompt._id}
                    className="slide-up"
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