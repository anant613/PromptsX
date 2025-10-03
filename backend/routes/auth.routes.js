// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/auth.controllers.js');
const { protect } = require('../middlewares/auth.middlewares.js');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
