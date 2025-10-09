import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", page: "home" },
    ...(user ? [
      { label: "Create", page: "create" },
      { label: "My Prompts", page: "my-prompts" },
    ] : []),
  ];

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="logo" onClick={() => setCurrentPage("home")} style={{cursor: 'pointer'}}>
          PromptsX
        </h1>

        {/* Desktop Navigation */}
        <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
          <button
            onClick={() => setCurrentPage("home")}
            style={{
              background: currentPage === 'home' ? 'rgba(255,107,53,0.2)' : 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: currentPage === 'home' ? '#ff6b35' : 'white',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
          >
            Home
          </button>
          
          {user && (
            <>
              <button
                onClick={() => setCurrentPage("create")}
                style={{
                  background: currentPage === 'create' ? 'rgba(255,107,53,0.2)' : 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: currentPage === 'create' ? '#ff6b35' : 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                Create
              </button>
              
              <button
                onClick={() => setCurrentPage("my-prompts")}
                style={{
                  background: currentPage === 'my-prompts' ? 'rgba(255,107,53,0.2)' : 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: currentPage === 'my-prompts' ? '#ff6b35' : 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                My Prompts
              </button>
            </>
          )}

          {user ? (
            <>
              <span style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginLeft: '1rem'}}>Hi, {user.username}</span>
              <button 
                onClick={logout}
                style={{
                  background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                  border: 'none',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setCurrentPage("login")}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                Login
              </button>
              <button 
                onClick={() => setCurrentPage("register")}
                style={{
                  background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                  border: 'none',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div style={{display: 'none'}} className="mobile-menu-toggle">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(0,0,0,0.95)',
          backdropFilter: 'blur(20px)',
          padding: '1rem',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                setMenuOpen(false);
              }}
              style={{
                display: 'block',
                width: '100%',
                background: currentPage === page ? 'rgba(255,107,53,0.1)' : 'none',
                border: 'none',
                color: currentPage === page ? '#ff6b35' : 'white',
                padding: '1rem',
                textAlign: 'left',
                cursor: 'pointer',
                borderRadius: '8px',
                marginBottom: '0.5rem'
              }}
            >
              {label}
            </button>
          ))}
          
          {user ? (
            <>
              <div style={{padding: '1rem', color: 'rgba(255,255,255,0.8)', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '1rem'}}>
                Hi, {user.username}
              </div>
              <button 
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="btn-primary" 
                style={{width: '100%', marginTop: '0.5rem'}}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => {
                  setCurrentPage("login");
                  setMenuOpen(false);
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  padding: '1rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  marginTop: '1rem'
                }}
              >
                Login
              </button>
              <button 
                onClick={() => {
                  setCurrentPage("register");
                  setMenuOpen(false);
                }}
                className="btn-primary" 
                style={{width: '100%', marginTop: '0.5rem'}}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;