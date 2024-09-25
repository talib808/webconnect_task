const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Route to create a new post (with file upload)
router.post('/', authMiddleware, upload.single('image'), postController.createPost);


// Route to get all posts
router.get('/', postController.getAllPosts);

// Route to like a post 
router.post('/:id/like', authMiddleware, postController.likePost);

module.exports = router; 
