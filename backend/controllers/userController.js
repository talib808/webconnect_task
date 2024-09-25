const db = require('../config/db');

// Follow a user
exports.followUser = (req, res) => {
  const followingId = req.params.id;
  const followerId = req.user.userId; 
  const query = `INSERT INTO follows (follower_id, following_id) VALUES (?, ?)`;
  
  db.query(query, [followerId, followingId], (err) => {
    if (err) return res.status(500).json({ error: 'Error following user' });
    res.json({ message: 'User followed successfully' });
  });
};

// Unfollow a user (optional)
exports.unfollowUser = (req, res) => {
  const followingId = req.params.id;
  const followerId = req.user.userId; 
  const query = `DELETE FROM follows WHERE follower_id = ? AND following_id = ?`;
  
  db.query(query, [followerId, followingId], (err) => {
    if (err) return res.status(500).json({ error: 'Error unfollowing user' });
    res.json({ message: 'User unfollowed successfully' });
  });
};
