const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Database connection
const connectDB = require('./config/db.js');
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'https://promptsx.vercel.app', 
    'https://promptsx-git-master-anant613s-projects.vercel.app',
    'https://promptsx-anant613s-projects.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    message: "Prompt Share Hub API is running!",
    status: "success",
    timestamp: new Date().toISOString()
  });
});

// Import routes
const authRoutes = require('./routes/auth.routes.js');
const promptRoutes = require('./routes/prompt.routes.js');
const userRoutes = require('./routes/user.routes.js');
const commentRoutes = require('./routes/comment.routes.js');

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;