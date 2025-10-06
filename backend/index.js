const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/auth.routes.js');
const promptRoutes = require('./routes/prompt.routes.js');
const userRoutes = require('./routes/user.routes.js');
const commentRoutes = require('./routes/comment.routes.js');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Prompt Share Hub API is running!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
