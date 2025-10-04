import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePrompt from './pages/CreatePrompt';
import MyPrompts from './pages/MyPrompts';
import './App.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [editPrompt, setEditPrompt] = useState(null);
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login setCurrentPage={setCurrentPage} />;
      case 'register':
        return <Register setCurrentPage={setCurrentPage} />;
      case 'create':
        return (
          <CreatePrompt 
            setCurrentPage={setCurrentPage} 
            editPrompt={editPrompt}
            setEditPrompt={setEditPrompt}
          />
        );
      case 'my-prompts':
        return (
          <MyPrompts 
            setCurrentPage={setCurrentPage}
            setEditPrompt={setEditPrompt}
          />
        );
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
