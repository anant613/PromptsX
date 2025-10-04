const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// API Routes
app.post('/api/prompts', (req, res) => {
    res.json({ message: 'Prompt created', data: req.body });
});

app.get('/api/prompts', (req, res) => {
    res.json({ message: 'All prompts', data: [] });
});

app.get('/api/prompts/:id', (req, res) => {
    res.json({ message: 'Prompt found', id: req.params.id });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});