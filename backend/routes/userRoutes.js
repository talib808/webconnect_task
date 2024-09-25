const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to follow a user
router.post('/:id/follow', authMiddleware, userController.followUser);

// Route to unfollow a user
router.post('/:id/unfollow', authMiddleware, userController.unfollowUser);

module.exports = router;
