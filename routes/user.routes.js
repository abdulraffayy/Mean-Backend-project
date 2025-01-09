const express = require('express');
const { registerUser, loginUser } = require('../controllers/user.controller');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Example of protected route
router.get('/admin', authenticateToken, authorizeRoles('admin'), (req, res) => {
    res.send({ message: 'Welcome, Admin!' });
});

module.exports = router;
