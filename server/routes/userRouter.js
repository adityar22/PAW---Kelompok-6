const express = require('express');
const { signupUser, loginUser, updateUser, getUser, getUserById, deleteUser } = require('../controller/userController');

const router = express.Router();

// Login route
router.post('/login', loginUser);

// Signup route
router.post('/signup', signupUser);

// Get route
router.get('/profile/', getUser);
router.get('/profile/:id', getUserById);

// Update route
router.put('/profile/:id', updateUser);

// Delete route
router.delete('/profile/:id', deleteUser);

module.exports = router;