const db = require('../config/db');
const path = require('path');


// Create a new post

exports.createPost = (req, res) => {
  const { content } = req.body;
  const userId = req.user.userId;
  const imagePath = req.file ? req.file.path : null; 

  const query = `INSERT INTO posts (user_id, content, image) VALUES (?, ?, ?)`;
  
  db.query(query, [userId, content, imagePath], (err) => {
    if (err) return res.status(500).json({ error: 'Error creating post' });
    res.status(201).json({ message: 'Post created successfully' });
  });
};


// Retrieve all posts
exports.getAllPosts = (req, res) => {
  const query = `SELECT * FROM posts ORDER BY created_at DESC`;
  
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error retrieving posts' });
    res.json(results);
  });
};

// Like a post
exports.likePost = (req, res) => {
  const postId = req.params.id;
  const userId = req.user.userId; 

 
  const checkQuery = `SELECT * FROM likes WHERE user_id = ? AND post_id = ?`;
  db.query(checkQuery, [userId, postId], (checkErr, checkResults) => {
    if (checkErr) return res.status(500).json({ error: 'Error checking like status' });


    if (checkResults.length > 0) {
      return res.status(400).json({ error: 'You already liked this post' });
    }

    const insertQuery = `INSERT INTO likes (user_id, post_id) VALUES (?, ?)`;
    db.query(insertQuery, [userId, postId], (insertErr) => {
      if (insertErr) return res.status(500).json({ error: 'Error liking post' });


      const updateQuery = `UPDATE posts SET likes = likes + 1 WHERE id = ?`;
      db.query(updateQuery, [postId], (updateErr) => {
        if (updateErr) return res.status(500).json({ error: 'Error updating like count' });


        const getUpdatedPostQuery = `SELECT * FROM posts WHERE id = ?`;
        db.query(getUpdatedPostQuery, [postId], (getPostErr, postResults) => {
          if (getPostErr) return res.status(500).json({ error: 'Error fetching updated post' });
          

          res.json({ message: 'Post liked successfully', post: postResults[0] });
        });
      });
    });
  });
};
