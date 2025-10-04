import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600 cursor-pointer" 
                onClick={() => setCurrentPage('home')}>
              Prompt Share Hub
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 'home' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Home
            </button>
            
            {user ? (
              <>
                <button
                  onClick={() => setCurrentPage('create')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === 'create' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Create
                </button>
                <button
                  onClick={() => setCurrentPage('my-prompts')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === 'my-prompts' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  My Prompts
                </button>
                <span className="text-gray-700">Hi, {user.username}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setCurrentPage('login')}
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentPage('register')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;