import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';
import { Lock, Mail, Zap } from 'lucide-react';

const Login = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      login(response.data.data);
      setCurrentPage('home');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center animated-bg relative overflow-hidden">
      {/* Neon Curves Background */}
      <div className="neon-curves">
        <div className="curve curve-1"></div>
        <div className="curve curve-2"></div>
        <div className="curve curve-3"></div>
        <div className="curve curve-4"></div>
      </div>

      <div className="landing-overlay relative z-10 w-full flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold holographic mb-4 neon-text">
              NEURAL ACCESS
            </h2>
            <p className="text-gray-300 font-mono">Enter the AI Prompt Nexus</p>
          </div>

          {/* Login Form */}
          <div className="dark-card rounded-3xl p-8 neon-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-400/50 text-red-300 px-4 py-3 rounded-xl backdrop-blur-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {/* Email Input */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                    <input
                      type="email"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 font-mono"
                      placeholder="Neural ID (Email)"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                    <input
                      type="password"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 font-mono"
                      placeholder="Access Code (Password)"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <div className="relative w-full flex justify-center items-center py-4 px-6 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-xl text-white font-bold transition-all duration-300 disabled:opacity-50">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      ACCESSING NEXUS...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      ENTER NEXUS
                    </>
                  )}
                </div>
              </button>

              {/* Register Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setCurrentPage('register')}
                  className="text-cyan-400 hover:text-cyan-300 font-mono transition-colors duration-300 neon-text"
                >
                  Need neural access? Create account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;