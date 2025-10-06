import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", page: "home" },
    ...(user
      ? [
          { label: "Create", page: "create" },
          { label: "My Prompts", page: "my-prompts" },
        ]
      : []),
  ];

  return (
    <nav className="bg-black/90 backdrop-blur-xl shadow-2xl border-b border-purple-500/20 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent cursor-pointer"
            onClick={() => setCurrentPage("home")}
          >
            Prompt Share Hub
          </motion.h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  currentPage === page
                    ? "text-purple-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {label}
                {currentPage === page && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                  />
                )}
              </button>
            ))}

            {user ? (
              <>
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-gray-700"
                  />
                  <span className="text-gray-300 text-sm">
                    Hi, {user.username}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setCurrentPage("login")}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentPage("register")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-white transition"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800"
          >
            <div className="px-4 pt-2 pb-3 space-y-2">
              {navLinks.map(({ label, page }) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    setMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {label}
                </button>
              ))}

              {user ? (
                <>
                  <div className="flex items-center space-x-3 px-3 pt-2">
                    <img
                      src={user.avatar || "/default-avatar.png"}
                      alt="avatar"
                      className="w-8 h-8 rounded-full border border-gray-700"
                    />
                    <span className="text-gray-300 text-sm">
                      Hi, {user.username}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 mt-2"
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
                    className="w-full text-gray-300 hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage("register");
                      setMenuOpen(false);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
