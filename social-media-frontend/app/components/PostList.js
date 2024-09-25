'use client';

import { useEffect, useState } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts`);
      const data = await res.json();

      if (res.ok) {
        setPosts(data); 
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Posts</h2>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available.</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-4 mb-4 transition-transform transform hover:scale-105">
            <p className="text-gray-800">{post.content}</p>
            <div className="flex justify-between mt-4">
              <button className="text-blue-600 hover:underline">Like</button>
              <button className="text-gray-600 hover:underline">Follow</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
